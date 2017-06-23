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

/*
 * A react component, Builds a SVG line who's dimensions and styles
 * are customizable
 *
 * @class Line
 * @extends React.Component
 */
export default class Line extends React.Component {

 /*
  * Sets state and extents props
  */
  constructor(props) {
    super(props);
    this.state = {
      hovered: false,
      height: props.height,
      active: true
    };
  }

 /*
  * Updates state on svg hover
  *
  * return {Void}
  */
  mouseOver() {
    this.setState({
      hovered: true
    });
  }

 /*
  * Updates state on svg mouseout
  *
  * return {Void}
  */
  mouseOut() {
    this.setState({
      hovered: false
    });
  }

 /*
  * Runs lineOver props method when
  * the invisible line is hovered, passing
  * event properties
  *
  * @param {Object} e - React event object
  * return {Void}
  */
  mouseOverHidden(e) {
    this.props.lineOver([e.clientX, e.clientY], this.props.overlay, this.props.lineX, this.props.tooltip);
  }

 /*
  * Runs lineOut props method when
  * the invisible line is not longer hovered, passing
  * the react component to deactivate
  *
  * return {Void}
  */
  mouseOutHidden() {
    this.props.lineOut(this.props.tooltip);
  }

  render() {
    return(
      <svg
        onMouseOver={this.mouseOver.bind(this)}
        onMouseOut={this.mouseOut.bind(this)}
        className={this.props.classes}
        style={this.props.svgStyle}
        width={this.props.width}
        id={this.props.id}
        height={this.state.height}
        className={this.props.classes}>
        <line
          strokeWidth={this.props.strokeWidth}
          stroke={this.props.color}
          opacity={this.state.hovered && this.state.active ? this.props.opacity : '0'}
          x1={this.props.strokeWidth / 2}
          x2={this.props.strokeWidth / 2}
          strokeDasharray={this.props.dashArray}
          y2={this.state.height}
          y1='0' />
        <line className='dateline-hidden'
          onMouseOver={this.mouseOverHidden.bind(this)}
          onMouseMove={this.mouseOverHidden.bind(this)}
          onMouseOut={this.mouseOutHidden.bind(this)}
          style={this.props.style}
          opacity='0'
          x1={this.props.strokeWidth / 2}
          x2={this.props.strokeWidth / 2}
          strokeWidth={this.props.strokeWidth}
          stroke={this.props.color}
          y1='0'
          y2={this.state.height} />
      </svg>
    );
  }
}
Line.defaultProps = {
  dashArray: '5, 10',
  opacity: '0.5',
  width: '10',
  strokeWidth: '6',
  color: 'white',
  height: 200,
  svgStyle: {
    padding: '0 40px 0 40px',
    transform: 'translateX(-43px)'
  }
};