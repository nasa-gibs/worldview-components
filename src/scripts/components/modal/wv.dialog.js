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

  openDialog(e){
    e.preventDefault();

    var $dialog = $('<div>').dialog({
        dialogClass: "wv-panel wv-link-panel",
        title: "Copy this link to share:",
        show: { effect: "slide", direction: "up" },
        width: 300,
        height: "auto",
        minHeight: 10,
        draggable: false,
        resizable: false,
        // autoOpen: false,
      close: function(e){
        React.unmountComponentAtNode(this);
        $( this ).remove();
      }
    });

    var item =  "<div id='wv-link' >" +
        "<input type='text' value='' name='permalink_content' id='permalink_content' readonly/>";
    // if ( config.features.urlShortening ) {
    //     item += "<span autofocus></span><div id='wv-link-shorten'>" +
    //         "<input type='checkbox' value='' id='wv-link-shorten-check' />" +
    //         "<label id='wv-link-shorten-label' for='wv-link-shorten-check'>Shorten this link</label>" +
    //         "</div>";
    // }
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

    $dialog.html(item);

  }

    closeDialog(e){
      e.preventDefault();
      $dialog.dialog('close');
    }

    // toggleDialog() {
    //     $(this).toggle(function() {
    //         console.log('1click');
    //         this.openDialog();
    //     },function() {
    //         console.log('2click');
    //         this.closeDialog();
    //     });
    // }

  render(){
    //   return (
    //       <DialogContent closeDialog={closeDialog} />, $dialog[0]
    //   )
    if (this.props.isOpen === false) {
      return null
    }

    return(
        <button onClick={this.openDialog}>Open Dialog</button>
    )
  }

  close(e) {
    e.preventDefault()

    if (this.props.onClose) {
      this.props.onClose()
    }
  }

}
