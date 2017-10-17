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
  }

  componentWillUpdate(){
    this._cache.clearAll(); // Clear CellMeasurerCache
  }

  /*
   * Toggles expansion of metadata for a layer given that layer's ID
   * @method toggleExpansion
   * @param {string} layer - the layer to be toggled
   * @return {void}
   */
  toggleExpansion(layer){
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

  /*
   * Renders a single row, given it's index.
   * See https://github.com/bvaughn/react-virtualized/blob/master/docs/List.md#rowrenderer
   * @method _rowRenderer
   * @param {object} options - props used to render the row
   * @return {void}
   */
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
            expand={layer=>this.toggleExpansion(layer)}
            expanded={expanded}
            style={style}
            rowIndex={index}
            onState={model.add}
            offState={model.remove}
            onChange={index=>this.recalculateRowHeight(index)}
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
        ref={ref=>this._setListRef(ref)}
        rowCount={this.state.layerFilter.length}
        rowHeight={this._cache.rowHeight}
        scrollToAlignment="auto"
        rowRenderer={row=>this._rowRenderer(row)}
      />
    );
  }
  _setListRef (ref) { this._layerList = ref; }
}
