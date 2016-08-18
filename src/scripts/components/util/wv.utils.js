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

export default class Utils {
  /*
   * @constructor
   */
  constructor() {
    this.monthStringArray= [ "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
                          "JUL", "AUG", "SEP", "OCT", "NOV", "DEC" ];
  }
  /**
   * Gets the current day. Use this instead of the Date methods to allow
   * debugging alternate "now" times.
   *
   * @method today
   * @static
   * @return {Date} The current time with the UTC hours, minutes, and seconds
   * fields set to zero or an overriden value.
   */
  today() {
    return this.clearTimeUTC(this.now());
  }

  /**
   * Sets a date to UTC midnight.
   *
   * @method clearTimeUTC
   * @static
   * @param date {Date} date to set the UTC hours, minutes, and seconds
   * to zero.
   * @return {Date} the date object
   */
  clearTimeUTC(date) {
    date.setUTCHours(0);
    date.setUTCMinutes(0);
    date.setUTCSeconds(0);
    date.setUTCMilliseconds(0);
    return date;
  }
  /**
   * Gets the current time. Use this instead of the Date methods to allow
   * debugging alternate "now" times.
   *
   * @method now
   * @static
   * @return {Date} The current time or an overriden value.
   */
  now() {
    return new Date();
  }
  stringInArray(arra, value) {
    for(var i = 0, len = arra.length; i < len; i++) {
      if(arra[i] === value) {
        return i;
      }
    }
    return false;
  }
  /**
   * Parses a UTC ISO 8601 date.
   *
   * @method parseDateUTC
   * @static
   * @param str {string} Date to parse in the form of ``YYYY-MM-DD``.
   * @return {Date} converted string as a date object, throws an exception if
   * the string is invalid
   */
    // NOTE: Older Safari doesn't like Date.parse
  parseDateUTC(dateAsString) {
    var dateTimeArr = dateAsString.split(/T/);
    var yyyymmdd = dateTimeArr[0].split('-');

    // Parse elements of date and time
    var year = yyyymmdd[0];
    var month = yyyymmdd[1] - 1;
    var day = yyyymmdd[2];

    var hour = 0;
    var minute = 0;
    var second = 0;
    var millisecond = 0;

    // Use default of midnight if time is not specified
    if (dateTimeArr.length > 1) {
      var hhmmss = dateTimeArr[1].split(/[:\.Z]/);
      hour = hhmmss[0] || 0;
      minute = hhmmss[1] || 0;
      second = hhmmss[2] || 0;
      millisecond = hhmmss[3] || 0;
    }
    var date = new Date(Date.UTC(year, month, day, hour, minute, second,
            millisecond));
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date: ' + dateAsString);
    }
    return date;
  }
  repeat(value, length) {
    var result = "";
    for(var i = 0; i < length; i++) {
      result += value;
    }
    return result;
  }
  pad(value, width, padding) {
    value = "" + value;
    if(value.length < width) {
      var add = width - value.length;
      value = this.repeat(padding, add) + value;
    }
    return value;
  }
}