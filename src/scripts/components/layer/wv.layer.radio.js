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
 * @class LayerRadio
 * @extends React.Component
 */
export default class LayerRadio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.enabled || false,
      details: false,
      visible: 'hidden'
    };
    this.handleDetails = this.handleDetails.bind(this);
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
  handleDetails(e) {
    e.stopPropagation();
    const newState = this.state.details === false ? true : false;
    this.setState({
      details: newState
    });
    if(newState){
      this.setState({visible: 'visible'});
      this.props.onChange(this.props.rowIndex);
    }
    else {
      this.setState({visible: 'hidden'});
      this.props.onChange(this.props.rowIndex);
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
          <div className='layers-all-header'>
            <Checkbox
               id={'checkbox-' + this.props.layerId}
               data-layer={this.props.layerId}
               checkboxClass="icheckbox_square-red iCheck iCheck-checkbox"
               increaseArea="20%"
               checked={this.state.checked}
               onChange={this.handleChange}
               />
            <div className="layers-all-title-wrap">
              <h3>
                {this.props.title}
                <span
                   className="fa fa-info-circle"
                   onClick={this.handleDetails}
                   >
                </span>
              </h3>
              <h5>{this.props.subtitle}</h5>
            </div>
          </div>
          <div className={"source-metadata " + this.state.visible}>
            {this.props.metadata}
            <div className="metadata-more">
              <span className="ellipsis up">^</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
