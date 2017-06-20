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
  clamp(val, min, max) {
    if (val < min) { return min; }
    if (val > max) { return max; }
    return val;
  }
  daysInMonth(d) {
    var y;
    var m;
    if(d.getUTCFullYear) {
      y = d.getUTCFullYear();
      m = d.getUTCMonth();
    } else {
      y = d.year;
      m = d.month;
    }
    var lastDay = new Date(Date.UTC(y, m + 1, 0));
    return lastDay.getUTCDate();
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
  minDate() {
    return new Date(Date.UTC(1000, 0, 1));
  }

  maxDate() {
    return new Date(Date.UTC(3000, 11, 31));
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
    var date = new Date(Date.UTC(year, month, day, hour, minute, second, millisecond));
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
  roll(val, min, max) {
    if(val < min) {return max - (min - val) + 1;}
    if(val > max) {return min + (val - max) - 1;}
    return val;
  }
  rollRange(date, interval, minDate, maxDate) {
    var y = date.getUTCFullYear();
    var m = date.getUTCMonth();
    var first, last;
    switch (interval) {
      case "day":
        var firstDay = new Date(Date.UTC(y, m, 1));
        var lastDay = new Date(Date.UTC(y, m, this.daysInMonth(date)));
        first = new Date(Math.max(firstDay, minDate)).getUTCDate();
        last = new Date(Math.min(lastDay, maxDate)).getUTCDate();
        break;
      case "month":
        var firstMonth = new Date(Date.UTC(y, 0, 1));
        var lastMonth = new Date(Date.UTC(y, 11, 31));
        first = new Date(Math.max(firstMonth, minDate)).getUTCMonth();
        last = new Date(Math.min(lastMonth, maxDate)).getUTCMonth();
        break;
      case "year":
        var firstYear = this.minDate();
        var lastYear = this.maxDate();
        first = new Date(Math.max(firstYear, minDate)).getUTCFullYear();
        last = new Date(Math.min(lastYear, maxDate)).getUTCFullYear();
        break;
    }
    return { first: first, last: last };
  }
  rollDate(date, interval, amount, minDate, maxDate) {
    minDate = minDate || this.minDate();
    maxDate = maxDate || this.maxDate();
    var range = this.rollRange(date, interval, minDate, maxDate);
    var min = range.first;
    var max = range.last;
    var day = date.getUTCDate();
    var month = date.getUTCMonth();
    var year = date.getUTCFullYear();
    switch (interval) {
      case "day":
        day = this.roll(day + amount, min, max);
        break;
      case "month":
        month = this.roll(month + amount, min, max);
        break;
      case "year":
        year = this.roll(year + amount, min, max);
        break;
      default:
        throw new Error("[rollDate] Invalid interval: " + interval);
    }
    var daysInMonth = this.daysInMonth({year: year, month: month});
    if(day > daysInMonth) {
      day = daysInMonth;
    }
    var newDate = new Date(Date.UTC(year, month, day));
    newDate = new Date(this.clamp(newDate, minDate, maxDate));
    return newDate;
  }
  pad(value, width, padding) {
    value = "" + value;
    if(value.length < width) {
      var add = width - value.length;
      value = this.repeat(padding, add) + value;
    }
    return value;
  }
  objectToGetParams(object) {
    return '?' + Object.keys(object)
      .filter(key => !!object[key])
      .map(key => `${key}=${encodeURIComponent(object[key])}`)
      .join('&');
  }
}
