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
import LoopButton from './wv.loopbutton';
import PlayButton from './wv.playbutton';


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
      value: this.props.sliderSpeed,
      looping: this.props.looping,
      startDate: this.props.startDate,
      endDate: this.props.endDate,
      header: this.props.header
    };
  }
  componentWillReceiveProps(props) {
    this.setState({
      startDate: props.startDate,
      endDate: props.endDate,
      playing: props.playing,
      header: props.header
    });
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
    this.props.onSlide(value);
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
    this.props.onPushPlay();
    this.setState({
      playing: true
    });
  }
  pause() {
    this.props.onPushPause();
    this.setState({
      playing: false
    });
  }
  onLoop() {
    var loop = true;
    if(this.state.looping) {
      loop = false;
    }
    this.setState({
      looping: loop
    });
    this.props.onPushLoop(loop);
  }
  onDateChange(id, date) {
    if(id === 'start') {
      this.setState({
        startDate: date
      });
      this.props.onDateChange(
        date,
        this.state.endDate
      );
    } else {
      this.setState({
        endDate: date
      });
      this.props.onDateChange(
        this.state.startDate,
        date
      );
    }
  }
  render() {
    return(
      <div id="wv-animation-widget" className="wv-animation-widget">
        <div className='wv-animation-widget-header'> {this.state.header}</div>
        <a href="javascript:void(null)" title="Share Animation GIF" className="wv-icon-case">
          <i className="fa fa-file-video-o wv-animation-widget-icon"/>
        </a>
        <div className="wv-slider-case">
          <InputRange maxValue={60} minValue={0} value={this.state.value} onChange={this.onSlide.bind(this)} />
          <span className="wv-slider-label">{this.props.sliderLabel}</span>
        </div>
        <LoopButton looping={this.state.looping} onLoop={this.onLoop.bind(this)}/>
        <PlayButton playing={this.state.playing} play={this.play.bind(this)} pause={this.pause.bind(this)} />
        <div>
          <TimeSelector
            width="120"
            height="30"
            date={this.state.startDate}
            id='start'
            onDateChange={this.onDateChange.bind(this)}
            maxDate={this.state.endDate}
            minDate={this.props.minDate}
          />
          <div className='thruLabel'>To</div>
          <TimeSelector
            width="120"
            height="30"
            date={this.state.endDate}
            id='end'
            onDateChange={this.onDateChange.bind(this)}
            maxDate={this.props.maxDate}
            minDate={this.state.startDate}
            />
        </div>
      </div>

    );
  }

}