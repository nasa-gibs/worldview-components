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
import Dragger from './wv-timeline-dragger.js';
import DraggerRange from './wv-timeline-draggerrange.js';

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
      endLocation: props.endLocation
    };
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
      if(startX + (2 * this.props.pinWidth) >= endX) {
        endX = startX + this.props.pinWidth;
      }
    } else if(id === 'end') {
      startX = this.state.startLocation;
      endX = deltaX + this.state.endLocation;
      if(startX + (2 * this.props.pinWidth) >= endX) {
        startX = endX - this.props.pinWidth;
      }
    } else {
      startX = deltaX + this.state.startLocation ;
      endX = deltaX + this.state.endLocation;
    }

    this.setState({
      startLocation: startX,
      endLocation: endX
    });

  }

  /*
   * @method render
   */
  render() {
    return(
      <g id="wv-timeline-range-selector" className="wv-timeline-range-selector">
        <DraggerRange
          width={this.state.endLocation -  (this.state.startLocation + this.props.pinWidth)}
          opacity={this.props.rangeOpacity}
          color={this.props.rangeColor}
          height={this.props.height}
          position={this.state.startLocation + this.props.pinWidth}
          onDrag={this.onItemDrag.bind(this)}
          id='range'/>
        <Dragger
          position={this.state.startLocation}
          color={this.props.startColor}
          width={this.props.pinWidth}
          height={this.props.height}
          onDrag={this.onItemDrag.bind(this)}
          triangleColor='#cccccc'
          first={true}
          id='start' />
        <Dragger
          position={this.state.endLocation}
          color={this.props.endColor}
          width={this.props.pinWidth}
          height={this.props.height}
          first={false}
          onDrag={this.onItemDrag.bind(this)}
          triangleColor='#afaeae'
          id='end'/>
      </g>
    );
  }

}