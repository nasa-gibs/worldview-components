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
 * group
 *
 * @class TimelineDragger
 * @extends React.Component
 */
export default class TimelineDragger extends React.Component {

  /*
   * @constructor
   */
  constructor(props) {
    super(props);
  }

  /*
   * When the component is dragged,
   * this function passes the id
   * and change-in-x of the drag
   * to onDrag callback
   *
   * @method handleDrag
   *
   * @return {void}
   */
  handleDrag(e, d) {
    this.props.onDrag(d.deltaX, this.props.id);
  }

  /*
   * @method render
   */
  render() {
    return(
      <Draggable
        onDrag={this.handleDrag.bind(this)}
        position={{x:this.props.position, y:0}}
        axis="x">
        <g>
          <rect
            width={this.props.width}
            height={this.props.height}
            style={{fill:this.props.color}}
          />
          {
           /*
            * this polygon element builds a triangle
            * based on the width and height of the
            * rectangle element
            */
          }
          <polygon
            points={'0,0,' + this.props.height / 2 + ',0 ' + this.props.height / 4 + ', ' +this.props.height / 2 }
            transform={'translate(' + (-(this.props.width * 1.75)) + ', ' + (-(this.props.height / 4)) +')'}
            fill={this.props.triangleColor}
          />
        </g>
      </Draggable>
    );
  }

}