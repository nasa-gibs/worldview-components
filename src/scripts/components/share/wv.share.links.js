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

import Util from '../util/wv.utils';
const util = new Util();

export default class ShareLinks {
  // Facebook: https://developers.facebook.com/docs/sharing/reference/share-dialog#redirect
  facebookUrlParams(app_id, href, redirect_uri, display) {
    return 'https://www.facebook.com/dialog/share?' + util.objectToGetParams({ app_id, href, redirect_uri, display });
  }

  // Twitter: https://dev.twitter.com/web/tweet-button/parameters#web-intent-example
  twitterUrlParams(url, text) {
    return 'https://twitter.com/intent/tweet?' + util.objectToGetParams({ url, text });
  }

  // Reddit: https://www.reddit.com/r/nasa/submit?url=[URL]&title=[TITLE]
  redditUrlParams(url, title) {
    return 'https://www.reddit.com/r/nasa/submit?' + util.objectToGetParams({ url, title });
  }

  // Email
  emailUrlParams(subject, body) {
    return 'mailto:' + util.objectToGetParams({ subject, body });
  }

  socialButton(id, className, href, target, title) {
    item += "<a ";
    item += "id='" + id;
    item += "' class='" + className;
    item += "' href='" + href;
    item += "' target='" + target;
    item += "' title='" + title;
    item += "'></a>";
  }

}
