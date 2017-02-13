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
 * A react component, Builds a rather specific
 * interactive widget
 *
 * @class AnimationWidget
 * @extends React.Component
 */
export default class LineText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      dateRight: props.dateRight,
      dateLeft: props.dateLeft
    };
  }

  render() {
    return(
      <svg className='dateline-text' style={this.props.svgStyle}>

        <rect
          fill={this.props.fill}
          width={this.props.textWidth}
          height={this.props.textHeight}
          x={this.props.x1}
          rx={this.props.recRadius}
          opacity={this.state.active ? this.props.rectOpacity : '0'}
          />
          <text
          y={this.props.textY}
          x={this.props.x1 + 3}
          fill={this.props.color}
          width={this.props.width}
          opacity={this.state.active ? this.props.textOpacity : '0'}
        >
          {this.state.dateLeft}
        </text>
        <rect
          fill={this.props.fill}
          width={this.props.textWidth}
          height={this.props.textHeight}
          x={this.props.x2}
          rx={this.props.recRadius}
          opacity={this.state.active ? this.props.rectOpacity : '0'}
        />
        <text
          y={this.props.textY}
          x={this.props.x2 + 3}
          fill={this.props.color}
          opacity={this.state.active ? this.props.textOpacity : '0'}
        >
          {this.state.dateRight}
        </text>
      </svg>
    );
  }
}
LineText.defaultProps = {
  textOpacity: 0.7,
  rectOpacity: 1,
  width: '300',
  color: 'white',
  textY: 14,
  fill: 'rgba(40,40,40,0.5)',
  x2: 155,
  x1: 45,
  textWidth: 80,
  textHeight: 20,
  recRadius: 3,
  svgStyle: {
    transform: 'translateX(-140px)'
  }
};