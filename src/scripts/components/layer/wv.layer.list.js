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
import LayerRadio from './wv.layer.radio.js';
import InfiniteScroll from 'react-infinite-scroller';


/*
 * A react component, Builds a list of layers using the LayerRadio component
 *
 *
 * @class LayerList
 * @extends React.Component
 */
export default class LayerList extends React.Component {
  constructor(props) {
    super(props);
    this.state =  {
      onClick: props.onClick,
      layerList: props.layerArray,
      config: props.configFile
    };

  }
  render() {
    return(
      <ul id="flat-layer-list">
        {this.state.layerList.map((layer, i) => {
          return(
                  <LayerRadio key={'layer-'+ layer + '-' + i} layerId={layer} title={this.state.config.layers[layer].title} subtitle={this.state.config.layers[layer].subtitle} />
          );
        })
        }
      </ul>
    );
  }
}
