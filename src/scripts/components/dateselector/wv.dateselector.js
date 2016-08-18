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
import DateInputColumn from './wv.dateselector.input';
import Utils from '../util/wv.utils';

const util = new Utils();

/*
 * A react component, is a draggable svg
 * group. It is a parent component that
 * rerenders when child elements are dragged
 *
 * @class TimelineRangeSelector
 */
export default class dateSelector extends React.Component {

  /*
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      date: this.props.date,
      tab: null
    };
  }
  nextTab(index) {
    var nextTab;
    if(index < 3) {
      nextTab = index + 1;
    } else {
      nextTab = 1;
    }
    this.setState({
      tab: nextTab
    });
  }
  updateDate(date) {
    this.setState({
      date: date
    });
  }
  render() {
    return (
      <div className="wv-date-selector-widget">
        <DateInputColumn startDate={new Date(2000)}
          today={new Date()}
          date={this.state.date}
          value={this.state.date.getUTCFullYear()}
          type="year"
          height={this.props.height}
          width={this.props.width}
          updateDate={this.updateDate.bind(this)}
          tabIndex={1}
          focused={(this.state.tab == 1)}
          nextTab={this.nextTab.bind(this)}
        />
        <DateInputColumn
          startDate={new Date(2000)}
          today={new Date()} date={this.state.date}
          type="month" height={this.props.height}
          width={this.props.width}
          updateDate={this.updateDate.bind(this)}
          value={util.monthStringArray[this.state.date.getUTCMonth()]}
          tabIndex={2}
          focused={(this.state.tab == 2)}
          nextTab={this.nextTab.bind(this)}
        />
        <DateInputColumn
          startDate={new Date(2000)}
          today={new Date()}
          date={this.state.date}
          type="day"
          height={this.props.height}
          width={this.props.width}
          updateDate={this.updateDate.bind(this)}
          value={util.pad(this.state.date.getUTCDate(), 2, '0')}
          tabIndex={3}
          focused={(this.state.tab == 3)}
          nextTab={this.nextTab.bind(this)}
        />
      </div>
    );
  }
}
