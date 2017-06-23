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

export default class Shortener extends React.Component {

  render() {
    return (
      <div id='wv-link'>
        <input type='text' value='' name='permalink_content' id='permalink_content' readonly/>";
        <span autofocus></span>
        <div id='wv-link-shorten'>
          <input type='checkbox' value='' id='wv-link-shorten-check' />
          <label id='wv-link-shorten-label' for='wv-link-shorten-check'>Shorten this link</label>
        </div>
      </div>
    );
  }

}
