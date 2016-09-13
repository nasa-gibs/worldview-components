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
import Draggable from 'react-draggable';
/*
 * A react component, is a draggable svg
 * rect element
 *
 * @class TimelineDraggerRange
 */
export default class TimelineDraggerRange extends React.Component {

  /*
   * @constructor
   */
  constructor(props) {
    super(props);
    this.opacity = {
      fillOpacity: this.props.opacity
    };
  }
  checkWidth() {
    var start = this.props.startLocation;
    var end = this.props.endLocation;
    var max = this.props.max;
    var width;

    if(start < 0){
      start = 0;
    }
    if(end > max){
      end = max;
    }
    width = end - start;
    if(width < 0) {
      width = 0;
    }
    this.state = {
      width: width,
      startLocation: start
    };
  }
  /*
   * When the component is dragged,
   * this function passes the id
   * and change in x of the drag
   * to onDrag property
   *
   * @method handleDrag
   *
   * @return {void}
   */
  handleDrag(e, d){
    e.stopPropagation();
    this.props.onDrag(d.deltaX);
  }

  /*
   * @method render
   */
  render() {
    this.checkWidth();
    return (
      <Draggable
        onStop={this.props.onStop}
        onDrag={this.handleDrag.bind(this)}
        axis="x"
        position={{x:this.state.startLocation, y:0}}>
          <rect
            fill={this.props.color}
            width={this.state.width}
            style={this.opacity}
            height={this.props.height}
            className='dragger-range' />
      </Draggable>
    );
  }

}