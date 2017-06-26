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
import {linkmodel} from './wv.link.model';
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

  // When an icon-link is clicked, replace the URL with current encoded link.
  replaceUrl() {
    var model = linkmodel();
    var promise = model.shorten();
    var getLink = encodeURIComponent(model.get());
    var shareMessage = 'Check out what I found in NASA Worldview!';
    var twMessage = 'Check out what I found in #NASAWorldview -';
    var emailBody = shareMessage + "%20-%20" + getLink;
    // var fbUrl = this.facebookUrlParams('121285908450463', getLink, getLink, 'popup');
    // var twUrl = this.twitterUrlParams(getLink, twMessage);
    // var rdUrl = this.redditUrlParams(getLink, shareMessage);
    // var emailUrl = this.emailUrlParams(shareMessage, emailBody);

    document.getElementById("fb-share").setAttribute("href", "https://www.facebook.com/dialog/share?" + "app_id=" + '121285908450463' + "&href=" + getLink + "&redirect_uri=" + getLink + "&display=popup");
    document.getElementById("tw-share").setAttribute("href", "https://twitter.com/intent/tweet?" + "url=" + getLink + "&text=" + twMessage);
    document.getElementById("rd-share").setAttribute("href", "https://www.reddit.com/r/nasa/submit?" + "url=" + getLink + "&title=" + shareMessage);
    document.getElementById("email-share").setAttribute("href", "mailto:?" + "subject=" + shareMessage + "&body=" + emailBody);

    // If a short link can be generated, replace the full link.
    promise.done(function(result) {
      if (result.status_code === 200) {
        getLink = encodeURIComponent(result.data.url);
        emailBody = shareMessage + "%20-%20" + getLink;

        document.getElementById("tw-share").setAttribute("href", "https://twitter.com/intent/tweet?" + "url=" + getLink + "&text=" + twMessage);
        document.getElementById("email-share").setAttribute("href", "mailto:?" + "subject=" + shareMessage + "&body=" + emailBody);
        return false;
      }
    });
  }

  socialButton(id, className, href, target, title) {
    var link;

    link = "<a ";
    link += "id='" + id;
    link += "' class='" + className;
    link += "' href='" + href;
    link += "' target='" + target;
    link += "' title='" + title;
    link += "'></a>";

    return link;
  }

  render() {
    var model = linkmodel();
    var getLink = model.get();
    var shareMessage = 'Check out what I found in NASA Worldview!';
    var twMessage = 'Check out what I found in #NASAWorldview -';
    var emailBody = shareMessage + " - " + getLink;
    var fbUrl = this.facebookUrlParams('121285908450463', getLink, getLink, 'popup');
    var twUrl = this.twitterUrlParams(getLink, twMessage);
    var rdUrl = this.redditUrlParams(getLink, shareMessage);
    var emailUrl = this.emailUrlParams(shareMessage, emailBody);

    return (
      <div id="social-share">
        <a id="fb-share" className="icon-link fa fa-facebook fa-2x" href={fbUrl} onClick={this.replaceUrl} target="_blank" title="Share via Facebook!" />
        <a id="tw-share" className="icon-link fa fa-twitter fa-2x" href={twUrl} onClick={this.replaceUrl} target="_blank" title="Share via Twitter!" />
        <a id="rd-share" className="icon-link fa fa-reddit fa-2x" href={rdUrl} onClick={this.replaceUrl} target="_blank" title="Share via Reddit!" />
        <a id="email-share" className="icon-link fa fa-envelope fa-2x" href={emailUrl} onClick={this.replaceUrl} target="_self" title="Share via Email!" />
      </div>
    );
  }

}
