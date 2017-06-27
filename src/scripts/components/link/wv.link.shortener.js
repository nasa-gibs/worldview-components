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
import {linkmodel} from './wv.link.model';

export default class Shortener extends React.Component {

  constructor() {
    super();
    this.shortenCheck = this.shortenCheck.bind(this);
  }

  shortenCheck() {
    var model = linkmodel();
    var checkedValue = document.getElementById('wv-link-shorten-check').checked;

    var error = function() {
      console.warn("Unable to shorten URL");
      console.warn.apply(console, arguments);
      // wv.ui.notify("Unable to shorten the permalink at this time. " +
      //   "Please try again later.");
    };

    if (checkedValue) {
      var promise = model.shorten();
      // WVC.GA.event('Link', 'Check', 'Shorten');
      document.getElementById("permalink_content").value = "Please wait...";
      promise.done(function(result) {
        if (result.status_code === 200) {
          document.getElementById("permalink_content").value = result.data.url;
        } else {
          error(result.status_code, result.status_txt);
        }
      }).fail(function(jqXHR, textStatus, errorThrown) {
        error(textStatus, errorThrown);
      });
      document.getElementById("permalink_content").focus();
      document.getElementById("permalink_content").select();
    } else {
      console.log('not checked');
      document.getElementById("permalink_content").value = model.get();
      // WVC.GA.event('Link', 'Check', 'Lengthen');
      document.getElementById("permalink_content").focus();
      document.getElementById("permalink_content").select();
    }
  }

  render() {
    return (
      <div id='wv-link'>
        <input type='text' value='' name='permalink_content' id='permalink_content' readOnly />
        <span autoFocus></span>
        <div id='wv-link-shorten'>
          <input type='checkbox' value='' id='wv-link-shorten-check' onChange={this.shortenCheck} />
          <label id='wv-link-shorten-label' htmlFor='wv-link-shorten-check'>Shorten this link</label>
        </div>
      </div>
    );
  }

}
