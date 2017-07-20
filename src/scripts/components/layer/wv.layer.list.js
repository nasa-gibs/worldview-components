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
    this.state =  {
      onClick: props.onClick,
      layerList: props.layerArray,
      config: props.layers
    };

  }
  rowRenderer ({
    key,         // Unique key within array of rows
    index,       // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible,   // This row is visible within the List (eg it is not an overscanned row)
    style        // Style object to be applied to row (to position it)
  }) {
    return (
      <LayerRadio
        key={'layer-'+ this.state.layerList[index] + '-' + key}
        layerId={this.state.layerList[index]}
        title={this.state.config[this.state.layerList[index]].title}
        subtitle={this.state.config[this.state.layerList[index]].subtitle}
        style={style}
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
            rowCount={this.state.layerList.length}
            rowHeight={48}
            rowRenderer={this.rowRenderer.bind(this)}
          />
        )}
      </AutoSizer>
    );
  }
}
