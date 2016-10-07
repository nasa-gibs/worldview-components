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
import Tooltip from '../tooltip/wv.tooltip';

/*
 * A react component, Builds a rather specific
 * interactive widget
 *
 * @class AnimationWidget
 * @extends React.Component
 */
export default class animWidgetHeader extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div className='wv-animation-widget-header'>
        {'Animate Map in '}
        <Tooltip text={this.props.text} onClick={this.props.onClick} dataArray={this.props.toolTipTextArray}/>
        {' Increments'}
      </div>
    );
  }
}