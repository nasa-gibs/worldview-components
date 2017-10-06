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
import renderHTML from 'react-render-html';

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
      metadataIsVisible: this.props.expanded || false
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
    const newState = this.state.metadataIsVisible === false ? true : false;
    this.setState({
      metadataIsVisible: newState
    });
    if(newState){
      this.setState({visible: 'visible'});
      this.props.onChange(this.props.rowIndex);
    }
    else {
      this.setState({visible: 'hidden'});
      this.props.onChange(this.props.rowIndex);
    }
    this.props.expand(this.props.layerId);
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
          data-layer={this.props.layerId}>
          <div className='layers-all-header'
               onClick={this.handleChange}>
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
                {this.props.metadata &&
                  <span
                    className="fa fa-info-circle"
                    onClick={this.handleDetails}
                    >
                  </span>
                }
              </h3>
              <h5>{this.props.subtitle}</h5>
            </div>
          </div>
          {this.props.metadata &&
              <div className={"source-metadata " +
                              (this.state.metadataIsVisible ?
                               'visible' : 'hidden')}>
              {renderHTML(this.props.metadata)}
              <div className="metadata-more" onClick={this.handleDetails}>
                <span className="ellipsis up">^</span>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}
