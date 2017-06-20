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

export default class Utils {
  facebook(subject, body) {
    return 'mailto:' + util.objectToGetParams({ subject, body });
  }

  twitter(subject, body) {
    return 'mailto:' + util.objectToGetParams({ subject, body });
  }


  email(subject, body) {
    return 'mailto:' + util.objectToGetParams({ subject, body });
  }
}
