/*
 * NASA Worldview
 *
 * This code was originally developed at NASA/Goddard Space Flight Center for
 * the Earth Science Data and Information System (ESDIS) project.
 *
 * Copyright (C) 2013 - 2016 United States Government as represented by the
 * Administrator of the National Aeronautics and Space Administration.
 * All Rights Reserved.
 *
 * Licensed under the NASA Open Source Agreement, Version 1.3
 * http://opensource.gsfc.nasa.gov/nosa.php
 */

import React from 'react';
import ShareLinks from './wv.share.links';

const link = new ShareLinks();

export default class Dialog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      configs: props.configs,
      models: props.models
    };
    this.openDialog = this.openDialog.bind(this);
  }

  openDialog() {
    var $dialog = wv.ui.getDialog();
    var config = this.props.configs;
    var model = this.props.models;
    var urlShortening = config.features.urlShortening;
    var item;

    var defaultLink = encodeURIComponent('http://worldview.earthdata.nasa.gov');
    var fbAppId = '121285908450463';
    var shareMessage = encodeURIComponent('Check out what I found in NASA\'s Worldview!').replace(/'/g, '%27');
    var twMessage = encodeURIComponent('Check out what I found in #NASAWorldview');
    var emailBody = shareMessage + "%20-%20" + defaultLink;
    var display = 'popup';

    var fbUrl = link.facebookUrlParams(fbAppId, defaultLink, defaultLink, display);
    var twUrl = link.twitterUrlParams(defaultLink, twMessage);
    var rdUrl = link.redditUrlParams(defaultLink, twMessage);
    var emailUrl = link.emailUrlParams(shareMessage, emailBody);

    // URL Shortening
    item = "<div id='wv-link' >" +
      "<input type='text' value='' name='permalink_content' id='permalink_content' readonly/>";
    if (urlShortening) {
      item += "<span autofocus></span><div id='wv-link-shorten'>" + "<input type='checkbox' value='' id='wv-link-shorten-check' />" + "<label id='wv-link-shorten-label' for='wv-link-shorten-check'>Shorten this link</label>" + "</div>";
    }
    item += "</div>";

    // Social Sharing
    item += "<div id='social-share'>";
    item += socialButton('fb-share', 'icon-link fa fa-facebook fa-2x', fbUrl, '_blank', 'Share via Facebook!');
    item += socialButton('tw-share', 'icon-link fa fa-twitter fa-2x', twUrl, '_blank', 'Share via Twitter!');
    item += socialButton('rd-share', 'icon-link fa fa-reddit fa-2x', rdUrl, '_blank', 'Share via Reddit!');
    item += socialButton('email-share', 'icon-link fa fa-envelope fa-2x', rdUrl, '_blank', 'Share via Email!');
    item += "</div>";

    $dialog.html(item).iCheck({checkboxClass: 'icheckbox_square-grey'});

    // If selected during the animation, the cursor will go to the
    // end of the input box
    var updateLink = function() {
      $('#permalink_content').val(model.link.get());
      $("#wv-link-shorten-check").iCheck("uncheck");
      $('#permalink_content').focus();
      $('#permalink_content').select();
    };

    model.link.events.on("update", updateLink);

    $dialog.dialog({
      dialogClass: "wv-panel wv-link-panel",
      title: "Copy this link to share:",
      show: {
          effect: "slide",
          direction: "up"
      },
      width: 300,
      height: "auto",
      minHeight: 10,
      draggable: false,
      resizable: false,
      autoOpen: false
    }).on("dialogclose", function() {
      $("#wv-link-button-check").prop("checked", false);
      $button.button("refresh");
      model.link.events.off("update", updateLink);
    });
    wv.ui.positionDialog($dialog, {
      my: "left top",
      at: "left bottom+5",
      of: $label
    });
    $(".ui-dialog").zIndex(600);

    $('#permalink_content').val(model.link.get());
    $dialog.dialog("open");
    setTimeout(updateLink, 500);
    // When an icon-link is clicked, replace the URL with current encoded link.
    $(".icon-link").on("click", function() {
      var fullEncodedLink = encodeURIComponent(model.link.get());
      var promise = model.link.shorten();

      // Set Facebook
      var fbLink = document.getElementById("fb-share");
      fbLink.setAttribute("href", "https://www.facebook.com/dialog/share?" + "app_id=" + fbAppId + "&href=" + fullEncodedLink + "&redirect_uri=" + fullEncodedLink + "&display=popup");

      // Set Twitter
      var twLink = document.getElementById("tw-share");
      twLink.setAttribute("href", "https://twitter.com/intent/tweet?" + "url=" + fullEncodedLink + "&text=" + twMessage + "%20-");

      // Set Reddit
      var rdLink = document.getElementById("rd-share");
      rdLink.setAttribute("href", "https://www.reddit.com/r/nasa/submit?" + "url=" + fullEncodedLink + "&title=" + shareMessage);

      // Set Email
      var emailLink = document.getElementById("email-share");
      emailLink.setAttribute("href", "mailto:?" + "subject=" + shareMessage + "&body=" + shareMessage + "%20-%20" + fullEncodedLink);

      // If a short link can be generated, replace the full link.
      promise.done(function(result) {
        if (result.status_code === 200) {
          var shortLink = result.data.url;
          var shortEncodedLink = encodeURIComponent(shortLink);

          // Set Twitter
          twLink.setAttribute("href", "https://twitter.com/intent/tweet?" + "url=" + shortEncodedLink + "&text=" + twMessage + "%20-");

          // Set Email
          emailLink.setAttribute("href", "mailto:?" + "subject=" + shareMessage + "&body=" + shareMessage + "%20-%20" + shortEncodedLink);
          return false;
        }
      });
    });

    //$("#wv-link-shorten-check").button();
    $("#wv-link-shorten-check").on("ifChanged", function() {
      var checked = $("#wv-link-shorten-check").prop("checked");
      if (checked) {
        var promise = model.link.shorten();
        WVC.GA.event('Link', 'Check', 'Shorten');
        $("#permalink_content").val("Please wait...");
        promise.done(function(result) {
          if (result.status_code === 200) {
            $('#permalink_content').val(result.data.url);
          } else {
            error(result.status_code, result.status_txt);
          }
        }).fail(function(jqXHR, textStatus, errorThrown) {
          error(textStatus, errorThrown);
        });
      } else {
        $('#permalink_content').val(model.link.get());
        WVC.GA.event('Link', 'Check', 'Lengthen');
      }
      $('#permalink_content').focus();
      $('#permalink_content').select();
    });

    var error = function() {
        console.warn("Unable to shorten URL");
        console.warn.apply(console, arguments);
        wv.ui.notify("Unable to shorten the permalink at this time. " +
          "Please try again later.");
    };

    $("#wv-link-shorten-check").prop("checked", false);
  }

  render() {
    return (
      <div>{this.openDialog()}</div>
    )
  }

}
