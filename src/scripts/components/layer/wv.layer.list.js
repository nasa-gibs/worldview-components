import React from 'react';
import LayerRadio from './wv.layer.radio.js';
import { CellMeasurer, CellMeasurerCache, List, AutoSizer } from 'react-virtualized';

/*
 * A react component, Builds a list of layers using the LayerRadio component
 * @class LayerList
 * @extends React.Component
 */
export default class LayerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layerFilter: props.config.layerOrder,
      active: props.model.active,
      infoExpanded: [],
      width: props.width,
      height: props.height
    };
    this._cache = new CellMeasurerCache({
      fixedWidth: true,
      minHeight: 23,
      minWidth: this.state.width
    });

    this._rowRenderer = this._rowRenderer.bind(this);
    this._setListRef = this._setListRef.bind(this);
    this.saveExpandedInfoState = this.saveExpandedInfoState.bind(this);
  }
  componentWillUpdate(){
    this._cache.clearAll();
  }
  /*
   * Saves the visibility/state of the metadata for each layer
   * @method saveExpandedInfoState
   * @param {string} layerID - the layer which has metadata that
   *  needs to be toggled
   * @return {void}
   */
  saveExpandedInfoState(layer){
    var { infoExpanded } = this.state;
    var index = infoExpanded.indexOf(layer);
    if(index){
      infoExpanded.splice(index, 1); // Removes layer from expanded list
    } else {
      infoExpanded.push(layer);
    }
    this.setState({ infoExpanded: infoExpanded });
  }
  /*
   * Recalculates the row height for a given rowIndex
   * @method recalculateRowHeight
   * @param {number} index - Index of the row to be recalculated
   * @return {void}
   */
  recalculateRowHeight (rowIndex){
    this._cache.clear(rowIndex, 0);
    this._layerList.recomputeRowHeights(rowIndex);
    this._layerList.scrollToRow(rowIndex);
  }
  _rowRenderer ({ index, isScrolling, key, parent, style }) {
    var enabled = false;
    for(var i of this.props.model.active){
      if(i.id === this.state.layerFilter[index])
        enabled = true;
    }
    var current = this.state.layerFilter[index];
    var expanded = false;
    if(this.state.infoExpanded.includes(current))
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
            expand={this.saveExpandedInfoState}
            expanded={expanded}
            style={style}
            rowIndex={index}
            onState={this.props.model.add}
            offState={this.props.model.remove}
            onChange={this.recalculateRowHeight.bind(this)}
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
            width={width - 10}
            height={this.state.height}
            overscanRowCount={5}
            ref={this._setListRef}
            rowCount={this.state.layerFilter.length}
            rowHeight={this._cache.rowHeight}
            scrollToAlignment="auto"
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
