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

export default class ShareButtons extends React.Component {

  urlShortener() {
    var item;
    var urlShortening = this.props.configs;

    // URL Shortening
    item = "<input type='text' value='' name='permalink_content' id='permalink_content' readonly/>";
    if (urlShortening) {
      item += "<span autofocus></span><div id='wv-link-shorten'>" + "<input type='checkbox' value='' id='wv-link-shorten-check' />" + "<label id='wv-link-shorten-label' for='wv-link-shorten-check'>Shorten this link</label>" + "</div>";
    }

    return {__html: item};
  }

  shareButtons() {
    var item;
    var modelLink = this.props.models.link;
    var getLink = modelLink.get();
    var shareMessage = 'Check out what I found in NASA Worldview!';
    var twMessage = 'Check out what I found in #NASAWorldview -';
    var emailBody = shareMessage + " - " + getLink;
    var fbUrl = link.facebookUrlParams('121285908450463', getLink, getLink, 'popup');
    var twUrl = link.twitterUrlParams(getLink, twMessage);
    var rdUrl = link.redditUrlParams(getLink, shareMessage);
    var emailUrl = link.emailUrlParams(shareMessage, emailBody);

    item = link.socialButton('fb-share', 'icon-link fa fa-facebook fa-2x', fbUrl, '_blank', 'Share via Facebook!');
    item += link.socialButton('tw-share', 'icon-link fa fa-twitter fa-2x', twUrl, '_blank', 'Share via Twitter!');
    item += link.socialButton('rd-share', 'icon-link fa fa-reddit fa-2x', rdUrl, '_blank', 'Share via Reddit!');
    item += link.socialButton('email-share', 'icon-link fa fa-envelope fa-2x', emailUrl, '_self', 'Share via Email!');

    return {__html: item};
  }

  render() {
    return (
      <div>
        <div id='wv-link' dangerouslySetInnerHTML={this.urlShortener()} />
        <div id='social-share' dangerouslySetInnerHTML={this.shareButtons()} />
      </div>
    );
  }

}
