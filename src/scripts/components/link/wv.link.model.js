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

import _ from 'lodash';
import Deferred from 'deferred-js';
import {utilEvents} from '../util/wv.util.events';


export function linkmodel(config) {

  var self = {};
  var DEBUG_SHORTEN_LINK = "http://go.nasa.gov/1iKIZ4j";
  var ENCODING_EXCEPTIONS = [
    {
      match: new RegExp("%2C", "g"),
      replace: ","
    }, {
      match: new RegExp("%3B", "g"),
      replace: ";"
    }, {
      match: new RegExp("%3D", "g"),
      replace: "="
    }
  ];

  var shortenCache = new Cache(10);
  var mock = "";
  var components = [];

  self.events = utilEvents();

  var init = function() {
    if (config && config.parameters && config.parameters.shorten) {
      mock = "-" + config.parameters.shorten;
    }
  };

  self.register = function(component) {
    components.push(component);
    if (component.events) {
      component.events.any(function() {
        self.events.trigger("update");
      });
    }
    return self;
  };

  self.get = function() {
    var url = window.location.href;
    return url;
  };

  self.shorten = function(link) {
    if (!link) {
      link = self.get();
    }
    if (shortenCache[link]) {
      return Deferred().resolve(shortenCache[link]);
    }
    if (/localhost/.test(link)) {
      console.warn("Cannot shorten localhost, using", DEBUG_SHORTEN_LINK);
      return Deferred().resolve({
        status_code: 200,
        data: {
          url: DEBUG_SHORTEN_LINK
        }
      });
    }
    // TODO: Test the promise function & build catches replaced jquery with vanilla js
    // var promise = $.getJSON("service/link/shorten.cgi" + mock + "?url=" + encodeURIComponent(link));
    //
    // promise.done(function(result) {
    //   shortenCache[link] = result;
    // });
    // return promise;
    var promise = new XMLHttpRequest();
    promise.open('GET', "service/link/shorten.cgi" + mock + "?url=" + encodeURIComponent(url), true);

    promise.onload = function() {
      if (promise.status >= 200 && promise.status < 400) {
        shortenCache[link] = JSON.parse(promise.responseText);
      } else {
        // Server available but it returned an error
      }
    };

    promise.onerror = function() {
      // There was a connection error
    };

    promise.send();
    return promise;
  };

  self.load = function(state, errors) {
    errors = errors || [];
    _.each(components, function(component) {
      component.load(state, errors);
    });
  };

  var encode = function(value) {
    var encoded = encodeURIComponent(value);
    _.each(ENCODING_EXCEPTIONS, function(exception) {
      encoded = encoded.replace(exception.match, exception.replace);
    });
    return encoded;
  };

  init();

  return self;
}
