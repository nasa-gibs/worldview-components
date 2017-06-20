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
  facebook(app_id, href, redirect_uri, display) {
    return 'https://www.facebook.com/dialog/share?' + util.objectToGetParams({ app_id, href, redirect_uri, display });
  }

  twitter(url, text) {
    return 'https://twitter.com/intent/tweet?' + util.objectToGetParams({ url, text });
  }

  reddit(url, title) {
    return 'https://www.reddit.com/r/nasa/submit?' + util.objectToGetParams({ url, title });
  }

  email(subject, body) {
    return 'mailto:' + util.objectToGetParams({ subject, body });
  } 
}
