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
      layerFilter: props.config.layerOrder,
      active: props.model.active,
      expanded: [],
      width: props.width,
      height: props.height,
      ids: 'layerID'
    };
    this._cache = new CellMeasurerCache({
      fixedWidth: true,
      minHeight: 23,
      minWidth: this.state.width
    });

    this._rowRenderer = this._rowRenderer.bind(this);
    this._setListRef = this._setListRef.bind(this);
    this.saveExpand = this.saveExpand.bind(this);
  }
  componentWillUpdate(){
    this._cache.clearAll();
  }
  saveExpand(layer){
    var temp = this.state.expanded;
    var index = temp.indexOf(layer);
    if(index > -1){
      temp.splice(index, 1);
    }
    else
      temp.push(layer);
    this.setState({
      expanded: temp
    });
    console.log(this.state.expanded);
  }
  reRender (rowIndex){
    this._cache.clear(rowIndex, 0);
    this._layerList.recomputeRowHeights(rowIndex);
  }
  _rowRenderer ({ index, isScrolling, key, parent, style }) {
    var enabled = false;
    for(var i of this.props.model.active){
      if(i.id === this.state.layerFilter[index])
        enabled = true;
    }
    var current = this.state.layerFilter[index];
    var expanded = false;
    if(this.state.expanded.includes(current))
      expanded = true;
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
            key={'layer-'+ current + '-' + key}
            layerId={current}
            title={this.props.config.layers[current].title}
            subtitle={this.props.config.layers[current].subtitle}
            enabled={enabled}
            metadata={this.props.metadata[current] || null}
            expand={this.saveExpand}
            expanded={expanded}
            style={style}
            rowIndex={index}
            onState={this.props.model.add}
            offState={this.props.model.remove}
            onChange={this.reRender.bind(this)}
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
            overscanRowCount={5}
            ref={this._setListRef}
            rowCount={this.state.layerFilter.length}
            rowHeight={this._cache.rowHeight}
            scrollToAlignment="center"
            rowRenderer={this._rowRenderer}
          />
        )}
      </AutoSizer>
    );
  }
  _setListRef (ref) {
    this._layerList = ref;
  }
}
