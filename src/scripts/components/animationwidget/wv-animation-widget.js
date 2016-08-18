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
import InputRange from 'react-input-range';
import TimeSelector from '../dateselector/wv.dateselector';

/*
 * A react component, Builds a rather specific
 * interactive widget
 *
 * @class AnimationWidget
 * @extends React.Component
 */
export default class AnimationWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state =  {
      value:10,
      loop: false,
      startDate: this.props.startDate,
      endDate: this.props.endDate
    };
  }

  /*
   * Sets a new state value when a
   * when the slider is adjusted
   *
   * @method onSlide
   *
   * @param {Object} component - slider react
   *  component
   * @param {number} value - Value of the slider
   *  selection
   *
   * @return {void}
   */
  onSlide(component, value) {
    this.setState({
      value: value
    });
  }
  /*
   * Sets a new state to say whether or not
   * the animation should loop
   *
   * @method onLoop
   *
   * @param {Object} component - slider react
   *  component
   * @param {number} value - Value of the slider
   *  selection
   *
   * @return {void}
   */
  onLoop() {
    var loop = this.state.loop;
    if(loop) {
      this.setState({
        loop: false
      });
    } else {
      this.setState({
        loop: true
      });
    }
  }

  /*
   * calls the callback, passing the
   * current state elements as parameters
   *
   * @method play
   *
   * @return {void}
   */
  play() {
    this.props.onPushPlay({
      framerate: this.state.value,
      loop: this.state.loop,
      startDate: this.state.startDate,
      endDate: this.state.endDate
    });
  }
  onDateChange(type, date) {
    if(type === 'start') {
      this.setState({
        startDate: date
      });
    } else {
      this.setState({
        endDate: date
      });
    }
    this.props.onDateChange(
      this.state.startDate,
      this.state.endDate
    );
  }
  returnDate() {

  }
  render() {
    return(
      <div id="wv-animation-widget" className="wv-animation-widget">
        <a href="javascript:void(null)" title="Share Animation GIF" className="wv-icon-case">
          <i className="fa fa-file-video-o wv-animation-widget-icon"/>
        </a>
        <div className="wv-slider-case">
          <InputRange maxValue={60} minValue={0} value={this.state.value} onChange={this.onSlide.bind(this)} />
          <span className="wv-slider-label">{this.props.label}</span>
        </div>
        <a href="javascript:void(null)" title="click if you would like to loop the video" className={this.state.loop ? ' wv-icon-case wv-loop-icon-case wv-loop-active' : 'wv-loop-icon-case wv-icon-case' } >
          <i className="fa fa-refresh wv-animation-widget-icon" onClick={this.onLoop.bind(this)} />
        </a>
        <a href="javascript:void(null)" title="Play video" className='wv-anim-play-case wv-icon-case' onClick={this.play.bind(this)}>
          <i className='fa fa-play wv-animation-widget-icon' />
        </a>
        <TimeSelector width="25" height="8" date={this.state.startDate} name='start' onDateChange={this.onDateChange.bind(this)}/>
        <TimeSelector width="25" height="8" date={this.state.endDate} name='end' onDateChange={this.onDateChange.bind(this)}/>
      </div>

    );
  }

}