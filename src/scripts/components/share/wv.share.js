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
import ShareButtons from './wv.share.buttons';
import Shortener from './wv.shortener';

export default class Share extends React.Component {

  render() {

    return (
      <div>
        <Shortener />
        <ShareButtons />
      </div>
    );
  }

}
