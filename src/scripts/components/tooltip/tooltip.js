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
export default class Tooltip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: false
    };
  }
  mouseOver() {
    this.setState({
      hovered: true
    });
  }
  mouseOut() {
    this.setState({
      hovered: false
    });
  }
  render() {
    return(
      <div
      onMouseEnter={this.mouseOver.bind(this)}
      onMouseLeave={this.mouseOut.bind(this)}
      className="wv-tooltip-case">
        <span>{this.props.text}</span>
        <div className="wv-tooltip" style={(this.state.hovered) ? {visibility: 'visible'} : {}} >
          <ul>
            {this.props.dataArray.map((dataEl, i) => {
              return <li key={'tooltip-'+dataEl + '-' + i} id={dataEl} onClick={this.props.onClick}>{dataEl}</li>;
            })}
          </ul>
        </div>
      </div>
    );
  }
}