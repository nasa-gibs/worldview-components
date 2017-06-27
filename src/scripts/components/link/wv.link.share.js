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
import Util from '../util/wv.utils';
// import {linkmodel} from './wv.link.model';
const util = new Util();

export default class Links extends React.Component {

  // Facebook: https://developers.facebook.com/docs/sharing/reference/share-dialog#redirect
  facebookUrlParams(appId, href, redirectUri, display) {
    return 'https://www.facebook.com/dialog/share' + util.objectToGetParams({ appId, href, redirectUri, display });
  }

  // Twitter: https://dev.twitter.com/web/tweet-button/parameters#web-intent-example
  twitterUrlParams(url, text) {
    return 'https://twitter.com/intent/tweet' + util.objectToGetParams({ url, text });
  }

  // Reddit: https://www.reddit.com/r/nasa/submit?url=[URL]&title=[TITLE]
  redditUrlParams(url, title) {
    return 'https://www.reddit.com/r/nasa/submit' + util.objectToGetParams({ url, title });
  }

  // Email: mailto:?subject=[SUBJECT]&body=[BODY]
  emailUrlParams(subject, body) {
    return 'mailto:' + util.objectToGetParams({ subject, body });
  }

  render() {
    return (
      <div id="social-share">
        <a id="fb-share" className="icon-link fa fa-facebook fa-2x" href={this.props.fbLink} target="_blank" title="Share via Facebook!" />
        <a id="tw-share" className="icon-link fa fa-twitter fa-2x" href={this.props.twLink} target="_blank" title="Share via Twitter!" />
        <a id="rd-share" className="icon-link fa fa-reddit fa-2x" href={this.props.rdLink} target="_blank" title="Share via Reddit!" />
        <a id="email-share" className="icon-link fa fa-envelope fa-2x" href={this.props.emailLink} target="_self" title="Share via Email!" />
      </div>
    );
  }

}
