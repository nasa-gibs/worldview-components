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
import Shortener from './wv.shortener';
import Facebook from './wv.facebook';
import Twitter from './wv.twitter';
import Reddit from './wv.reddit';
import Email from './wv.email';
import { linkmodel } from './wv.share.model';

const link = new ShareLinks();

export default class Share extends React.Component {

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
        <Shortener />
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
