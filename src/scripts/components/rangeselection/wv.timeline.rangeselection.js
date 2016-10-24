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
import Dragger from './wv.timeline.dragger.js';
import DraggerRange from './wv.timeline.draggerrange.js';

/*
 * A react component, is a draggable svg
 * group. It is a parent component that
 * rerenders when child elements are dragged
 *
 * @class TimelineRangeSelector
 */
export default class TimelineRangeSelector extends React.Component {

  /*
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state =  {
      startLocation: props.startLocation,
      endLocation: props.endLocation,
      max: props.max,
    };
  }
  componentWillReceiveProps(props) {
    this.setState({
      startLocation: props.startLocation,
      endLocation: props.endLocation,
      max: props.max
    });
  }
  /*
   * When a child component is dragged,
   * this function is called to determine
   * the correct location for each of the
   * child elements after the drag
   *
   * @method handleDrag
   *
   * @param {number} deltaX - change in x
   * @param {string} id - Identifier used to
   *  distinguish between the child elements
   *
   * @return {void}
   */
  onItemDrag(deltaX, id) {
    var startX;
    var endX;

    if(id === 'start') {
      startX = deltaX + this.state.startLocation;
      endX = this.state.endLocation;
      if(startX < 0 || startX > endX) {
        return;
      }
      if(startX + (2 * this.props.pinWidth) >= endX) {
        endX = startX + this.props.pinWidth;
      }
    } else if(id === 'end') {
      startX = this.state.startLocation;
      endX = deltaX + this.state.endLocation;
      if(endX > this.state.max || startX > endX) {
        return;
      }
      if(startX + (2 * this.props.pinWidth) >= endX) {
        startX = endX - this.props.pinWidth;
      }
    } else {
      startX = deltaX + this.state.startLocation ;
      endX = deltaX + this.state.endLocation;
      if(endX >= this.state.max || startX < 0) {
        return;
      }
    }
    this.props.onDrag(startX, endX);

    this.setState({
      startLocation: startX,
      endLocation: endX
    });
  }

  /*
   * Send callback with new locations on
   * Drag Stop
   *
   * @method onDragStop
   *
   * @return {void}
   */
  onDragStop() {
    this.props.onDrag(this.state.startLocation, this.state.endLocation);
  }
  onRangeClick(d) {
    this.props.onRangeClick(d.nativeEvent);
  }
  /*
   * @method render
   */
  render() {
    return(
      <svg id="wv-timeline-range-selector" className="wv-timeline-range-selector">
        <DraggerRange
          width={this.props.pinWidth}
          endLocation={this.state.endLocation}
          opacity={this.props.rangeOpacity}
          color={this.props.rangeColor}
          height={this.props.height}
          startLocation={this.state.startLocation + this.props.pinWidth}
          onClick={this.onRangeClick.bind(this)}
          max={this.state.max}
          id='range'/>
        <Dragger
          position={this.state.startLocation}
          color={this.props.startColor}
          width={this.props.pinWidth}
          height={this.props.height}
          onDrag={this.onItemDrag.bind(this)}
          onStop={this.onDragStop.bind(this)}
          max={this.state.max}
          triangleColor={this.props.startTriangleColor}
          first={true}
          id='start' />
        <Dragger
          max={this.state.max}
          position={this.state.endLocation}
          color={this.props.endColor}
          width={this.props.pinWidth}
          height={this.props.height}
          first={false}
          onDrag={this.onItemDrag.bind(this)}
          onStop={this.onDragStop.bind(this)}
          triangleColor={this.props.endTriangleColor}
          id='end'/>
      </svg>
    );
  }

}