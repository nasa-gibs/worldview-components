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
import {Checkbox, Radio} from 'react-icheck';


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
    }
    render() {
        return(
            <li
               className='layers-all-layer'
               id={this.props.layerId}
               data-layer={this.props.layerId}
               onClick={this.props.onClick}>
              <Checkbox
                 id={this.props.layerId}
                 data-layer={this.props.layerId}
                 checkboxClass="icheckbox_square-red"
                 increaseArea="20%"
                 />
              <h3>{this.props.title}</h3>
              <h5>{this.props.subtitle}</h5>
            </li>
        );
    }
}
