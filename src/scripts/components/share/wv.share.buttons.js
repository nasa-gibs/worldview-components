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
import { linkmodel } from './wv.share.model';
import Facebook from './wv.facebook';
import Twitter from './wv.twitter';
import Reddit from './wv.reddit';
import Email from './wv.email';

const link = new ShareLinks();

export default class ShareButtons extends React.Component {

  urlShortener() {
    var item;
    var urlShortening = this.props.urlShortening;

    // URL Shortening
    item = "<input type='text' value='' name='permalink_content' id='permalink_content' readonly/>";
    if (this.props.urlShortening) {
      item += "<span autofocus></span><div id='wv-link-shorten'>" + "<input type='checkbox' value='' id='wv-link-shorten-check' />" + "<label id='wv-link-shorten-label' for='wv-link-shorten-check'>Shorten this link</label>" + "</div>";
    }

    return {__html: item};
  }

  render() {
    var model = linkmodel();
    var getLink = model.get();
    var shareMessage = 'Check out what I found in NASA Worldview!';
    var twMessage = 'Check out what I found in #NASAWorldview -';
    var emailBody = shareMessage + " - " + getLink;
    var fbUrl = link.facebookUrlParams('121285908450463', getLink, getLink, 'popup');
    var twUrl = link.twitterUrlParams(getLink, twMessage);
    var rdUrl = link.redditUrlParams(getLink, shareMessage);
    var emailUrl = link.emailUrlParams(shareMessage, emailBody);

    return (
      <div>
        <div id='wv-link' dangerouslySetInnerHTML={this.urlShortener()} />
        <div id="social-share">
          <Facebook fbUrl={fbUrl} />
          <Twitter twUrl={twUrl} />
          <Reddit rdUrl={rdUrl} />
          <Email emailUrl={emailUrl} />
        </div>
      </div>
    );
  }

}
