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

/*
 * A react component, Builds a rather specific
 * interactive widget
 *
 * @class AnimationWidget
 * @extends React.Component
 */
export default class Selector extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      value: props.value
    };
  }
  handleChange(event) {
    this.props.onChange(this.props.optionName, event.target.value);
  }
  render() {
    return (
      <select value={this.props.value} id={this.props.id} onChange={this.handleChange.bind(this)} >
        {this.props.optionArray.values.map((dataEl, i) => {
          return <option key={dataEl.value + '-' + i} value={ dataEl.value } >{ dataEl.text }</option>;
        })}
      </select>
    );
  }
}