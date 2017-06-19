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

export default class Dialog extends React.Component {

  constructor(props) {
    super(props);
    this.state =  {
      urlShortening: props.urlShortening,
      config: props.config,
      models: props.models,
      getModelsLink: props.getModelsLink,
      shortenModelsLink: props.shortenModelsLink
    };
    this.updates = this.updates.bind(this);
    this.openDialog = this.openDialog.bind(this);
  }

  updates() {
    // TODO: find and update your item, you can do it since you have an 'id'
    this.setState({
      getModelsLink: props.getModelsLink
    });
  }

  // showButton() {
  //   $button = $("<input></input>")
  //       .attr("type", "checkbox")
  //       .attr("id", "wv-link-button-check");
  //   $label = $("<label></label>")
  //       .attr("for", "wv-link-button-check")
  //       .attr("title", "Share this map");
  //   var $icon = $("<i></i>")
  //       .addClass("fa")
  //       .addClass("fa-share-square-o")
  //       .addClass("fa-2x");
  //   $label.append($icon);
  //   $(selector).append($label);
  //   $(selector).append($button);
  //   $button.button({
  //       text: false
  //   }).click(function() {
  //       var checked = $("#wv-link-button-check").prop("checked");
  //       WVC.GA.event('Link', 'Click', 'Share link Button');
  //       if ( checked ) {
  //           openDialog();
  //       } else {
  //           wv.ui.closeDialog();
  //       }
  //   });
  //
  //   models.link.events.on("update", replaceHistoryState);
  // }

  openDialog() {

      var $dialog = wv.ui.getDialog();
      var item =  "<div id='wv-link' >" +
          "<input type='text' value='' name='permalink_content' id='permalink_content' readonly/>";
      if ( this.state.urlShortening ) {
          item += "<span autofocus></span><div id='wv-link-shorten'>" +
              "<input type='checkbox' value='' id='wv-link-shorten-check' />" +
              "<label id='wv-link-shorten-label' for='wv-link-shorten-check'>Shorten this link</label>" +
              "</div>";
      }
      item += "</div>";

      // Social Sharing
      var defaultLink = encodeURIComponent('http://worldview.earthdata.nasa.gov');
      var fbAppId = '121285908450463';
      var shareMessage = encodeURIComponent('Check out what I found in NASA\'s Worldview!').replace(/'/g, '%27');
      var twMessage = encodeURIComponent('Check out what I found in #NASAWorldview');

      item += "<div id='social-share'>";

      // Facebook: https://developers.facebook.com/docs/sharing/reference/share-dialog#redirect
      item += "<a id='fb-share' class='icon-link fa fa-facebook fa-2x' href='https://www.facebook.com/dialog/share?" +
          "app_id=" + fbAppId +
          "&href=" + defaultLink +
          "&redirect_uri=" + defaultLink +
          "&display=popup' " +
          "target='_blank' " +
          "title='Share via Facebook!'></a>";

      // Twitter: https://dev.twitter.com/web/tweet-button/parameters#web-intent-example
      item += "<a id='tw-share' class='icon-link fa fa-twitter fa-2x' href='https://twitter.com/intent/tweet?" +
          "url=" + defaultLink +
          "&text=" + twMessage + "%20-' " +
          "target='_blank' " +
          "title='Share via Twitter!'></a>";

      // Reddit
      // https://www.reddit.com/r/nasa/submit?url=[URL]&title=[TITLE]
      item += "<a id='rd-share' class='icon-link fa fa-reddit fa-2x' href='https://www.reddit.com/r/nasa/submit?" +
          "url=" + defaultLink +
          "&title=" + shareMessage + "' " +
          "target='_blank' " +
          "title='Share via Reddit!'></a>";

      // Email
      item += "<a id='email-share' class='icon-link fa fa-envelope fa-2x' href='mailto:?" +
          "subject=" + shareMessage +
          "&body=" + shareMessage + "%20-%20" + defaultLink + "' " +
          "target='_self' " +
          "title='Share via Email!'></a>";

      item += "</div>";

      $dialog.html(item).iCheck({checkboxClass: 'icheckbox_square-grey'});

      // If selected during the animation, the cursor will go to the
      // end of the input box
      console.log(this.state.models);
      var updateLink  = function() {
        // this.props.updates(this.state.models.link.get());
          $('#permalink_content').val(this.state.models.link.get());
          $("#wv-link-shorten-check").iCheck("uncheck");
          $('#permalink_content').focus();
          $('#permalink_content').select();
      };

      this.state.models.link.events.on("update", updateLink);

      $dialog.dialog({
          dialogClass: "wv-panel wv-link-panel",
          title: "Copy this link to share:",
          show: { effect: "slide", direction: "up" },
          width: 300,
          height: "auto",
          minHeight: 10,
          draggable: false,
          resizable: false,
          autoOpen: false
      }).on("dialogclose", function() {
          $("#wv-link-button-check").prop("checked", false);
          $button.button("refresh");
          this.state.models.link.events.off("update", updateLink);
      });
      wv.ui.positionDialog($dialog, {
          my: "left top",
          at: "left bottom+5",
          of: $label
      });
      $(".ui-dialog").zIndex(600);

      $('#permalink_content').val(this.state.models.link.get());
      $dialog.dialog("open");
      setTimeout(updateLink, 500);
      // When an icon-link is clicked, replace the URL with current encoded link.
      $(".icon-link").on("click", function() {
          var fullEncodedLink = encodeURIComponent(this.state.models.link.get());
          console.log(fullEncodedLink);
          var promise = this.state.models.link.shorten();

          // Set Facebook
          var fbLink = document.getElementById("fb-share");
          fbLink.setAttribute("href", "https://www.facebook.com/dialog/share?" +
              "app_id=" + fbAppId +
              "&href=" + fullEncodedLink +
              "&redirect_uri=" + fullEncodedLink +
              "&display=popup"
          );

          // Set Twitter
          var twLink = document.getElementById("tw-share");
          twLink.setAttribute("href", "https://twitter.com/intent/tweet?" +
              "url=" + fullEncodedLink +
              "&text=" + twMessage + "%20-"
          );

          // Set Reddit
          var rdLink = document.getElementById("rd-share");
          rdLink.setAttribute("href", "https://www.reddit.com/r/nasa/submit?" +
              "url=" + fullEncodedLink +
              "&title=" + shareMessage
          );

          // Set Email
          var emailLink = document.getElementById("email-share");
          emailLink.setAttribute("href", "mailto:?" +
              "subject=" + shareMessage +
              "&body=" + shareMessage + "%20-%20" + fullEncodedLink
          );

          // If a short link can be generated, replace the full link.
          promise.done(function(result) {
              if ( result.status_code === 200 ) {
                  var shortLink = result.data.url;
                  var shortEncodedLink = encodeURIComponent(shortLink);

                  // Set Twitter
                  twLink.setAttribute("href", "https://twitter.com/intent/tweet?" +
                      "url=" + shortEncodedLink +
                      "&text=" + twMessage + "%20-"
                  );

                  // Set Email
                  emailLink.setAttribute("href", "mailto:?" +
                      "subject=" + shareMessage +
                      "&body=" + shareMessage + "%20-%20" + shortEncodedLink
                  );
                  return false;
              }
          });
      });

      //$("#wv-link-shorten-check").button();
      $("#wv-link-shorten-check").on("ifChanged", function() {
          var checked = $("#wv-link-shorten-check").prop("checked");
          if ( checked ) {
              var promise = this.state.models.link.shorten();
              WVC.GA.event('Link', 'Check', 'Shorten');
              $("#permalink_content").val("Please wait...");
              promise.done(function(result) {
                  if ( result.status_code === 200 ) {
                      $('#permalink_content').val(result.data.url);
                  } else {
                      error(result.status_code, result.status_txt);
                  }
              }).fail(function(jqXHR, textStatus, errorThrown) {
                  error(textStatus, errorThrown);
              });
          } else {
              $('#permalink_content').val(this.state.models.link.get());
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

  };

  render(){
    //   return (
    //       <DialogContent closeDialog={closeDialog} />, $dialog[0]
    //   )
    if (this.props.isOpen === false) {
      return null
    }

    return(
      <div>
        <button onClick={this.openDialog}>
          <span className="ui-button-text">
            <i className="fa fa-share-square-o fa-2x"></i>
          </span>
        </button>
      </div>
    )
  }

  close(e) {
    e.preventDefault()

    if (this.props.onClose) {
      this.props.onClose()
    }
  }

}
