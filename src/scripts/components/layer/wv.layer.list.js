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
import LayerRadio from './wv.layer.radio.js';
import { List, AutoSizer } from 'react-virtualized';

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
    this.state = {
      layerList: props.layerArray,
      config: props.layers
    };
  }
  rowRenderer ({ key, index, isScrolling, isVisible, style }) {
    return (
      <LayerRadio
        key={'layer-'+ this.props.layerArray[index] + '-' + key}
        layerId={this.props.layerArray[index]}
        title={this.props.layers[this.props.layerArray[index]].title}
        subtitle={this.props.layers[this.props.layerArray[index]].subtitle}
        style={style}
        onState={this.props.onState}
        offState={this.props.offState}
      />
    );
  }
  render() {
    return(
      <AutoSizer>
        {({ height, width }) => (
          <List
            id="flat-layer-list"
            width={width}
            height={height}
            rowCount={this.props.layerArray.length}
            rowHeight={53}
            scrollToAlignment="center"
            rowRenderer={this.rowRenderer.bind(this)}
          />
        )}
      </AutoSizer>
    );
  }
}
