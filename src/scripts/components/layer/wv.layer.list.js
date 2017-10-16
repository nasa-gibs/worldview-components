import React from 'react';
import LayerRadio from './wv.layer.radio.js';
import { CellMeasurer, CellMeasurerCache, List } from 'react-virtualized';

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
      expandedLayers: []
    };
    this._cache = new CellMeasurerCache({
      fixedWidth: true,
      minHeight: 23,
      minWidth: props.width
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
    var { expandedLayers } = this.state;
    var index = expandedLayers.indexOf(layer);
    if(index > -1){
      expandedLayers.splice(index, 1); // Removes layer from expanded list
    } else {
      expandedLayers.push(layer);
    }
    this.setState({ expandedLayers: expandedLayers });
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
    var { model, config, metadata } = this.props;
    var { layerFilter, expandedLayers } = this.state;
    var current = layerFilter[index];
    var enabled = model.active.map(layer=>layer.id).includes(current);
    var expanded = expandedLayers.includes(current);
    style.paddingTop = '5px';  //'Margin' for each list element
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
            key={key}
            layerId={current}
            title={config.layers[current].title}
            subtitle={config.layers[current].subtitle}
            enabled={enabled}
            metadata={metadata[current] || null}
            expand={this.saveExpandedInfoState}
            expanded={expanded}
            style={style}
            rowIndex={index}
            onState={model.add}
            offState={model.remove}
            onChange={this.recalculateRowHeight.bind(this)}
            onLoad={measure}
          />
        )}
    </CellMeasurer>
    );
  }
  render() {
    var { height, width } = this.props;
    return(
        <List
            deferredMeasurementCache={this._cache}
            id="flat-layer-list"
            width={width}
            height={height}
            overscanRowCount={5}
            ref={this._setListRef}
            rowCount={this.state.layerFilter.length}
            rowHeight={this._cache.rowHeight}
            scrollToAlignment="auto"
            rowRenderer={this._rowRenderer}
          />
    );
  }
  _setListRef (ref) {
    this._layerList = ref;
  }
}
