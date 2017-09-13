/*
 * NASA Worldview
 *
 * This code was originally developed at NASA/Goddard Space Flight Center for
 * the Earth Science Data and Information System (ESDIS) project.
 *
 * Copyright (C) 2013 - 2017 United States Government as represented by the
 * Administrator of the National Aeronautics and Space Administration.
 * All Rights Reserved.
 *
 * Licensed under the NASA Open Source Agreement, Version 1.3
 * http://opensource.gsfc.nasa.gov/nosa.php
 */

import React from 'react';
import {Checkbox} from 'react-icheck';

/*
 * A react component, Builds a toggle on/off layer selector
 * 
 *
 * @class Line
 * @extends React.Component
 */
export default class LayerRadio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange() {
    const newChecked = this.state.checked === false ? true : false;
    this.setState({
      checked: newChecked
    });
    if(newChecked) {
      this.props.onState(this.props.layerId);
    }
    else {
      this.props.offState(this.props.layerId);
    }
  }
  render() {
    return(
      <div
        className='margin-as-padding'
        id={'wrapper-' + this.props.layerId}
        style={this.props.style}
        >
        <div
          className='layers-all-layer'
          data-layer={this.props.layerId}
          onClick={this.handleChange}
          >
            <Checkbox
              id={'checkbox-' + this.props.layerId}
              data-layer={this.props.layerId}
              checkboxClass="icheckbox_square-red iCheck iCheck-checkbox"
              increaseArea="20%"
              checked={this.state.checked}
              onChange={this.handleChange}
              />
            <h3>{this.props.title}</h3>
            <h5>{this.props.subtitle}</h5>
        </div>
      </div>
    );
  }
}
