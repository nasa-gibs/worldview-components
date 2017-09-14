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
import { CellMeasurer, CellMeasurerCache, List, AutoSizer } from 'react-virtualized';

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
      showLayers: false,
      layerFilter: props.layerArray,
      width: props.modalWidth
    };
    this._cache = new CellMeasurerCache({
      fixedWidth: true,
      minHeight: 23,
      minWidth: this.state.width
    });

    this._rowRenderer = this._rowRenderer.bind(this);
  }
  componentWillUpdate(){
    this._cache.clearAll();
  }
  _rowRenderer ({ index, isScrolling, key, parent, style }) {
    return (
      <CellMeasurer
        cache={this._cache}
        columnIndex={0}
        key={key}
        parent={parent}
        rowIndex={index}
      >
        {({ measure }) => (
          <LayerRadio
            key={'layer-'+ this.state.layerFilter[index] + '-' + key}
            layerId={this.state.layerFilter[index]}
            title={this.props.layers[this.state.layerFilter[index]].title}
            subtitle={this.props.layers[this.state.layerFilter[index]].subtitle}
            style={style}
            onState={this.props.onState}
            offState={this.props.offState}
            onLoad={measure}
          />
        )}
    </CellMeasurer>
    );
  }
  render() {
    return(
      <AutoSizer>
        {({ height, width }) => (
          <List
            deferredMeasurementCache={this._cache}
            id="flat-layer-list"
            width={width}
            height={height}
            scrollToAlignment={"center"}
            overscanRowCount={10}
            rowCount={this.state.layerFilter.length}
            rowHeight={this._cache.rowHeight}
            scrollToAlignment="center"
            rowRenderer={this._rowRenderer}
          />
        )}
      </AutoSizer>
    );
  }
}
