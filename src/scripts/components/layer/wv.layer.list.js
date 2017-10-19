import React from 'react';
import renderHTML from 'react-render-html';
import LayerRadio from './wv.layer.radio.js';
import { AutoSizer, CellMeasurer, CellMeasurerCache, List } from 'react-virtualized';

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
    this._cache = new CellMeasurerCache({fixedWidth: true});
  }

  componentWillUpdate(nextProps, nextState){
    // The List component will use the previously calculated row heights when
    // things change, unless we clear the CellMeasurerCache here
    this._cache.clearAll();
  }

  componentDidUpdate(prevProps, prevState){
    // The List component calculates row height based on the previous width
    // So if width changes (usually on window resize), we need to force a re-render
    // This is hacky, and triggers a liner warning because it causes a layout thrash
    // More info: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-did-update-set-state.md
    // The only other solution I could think of is to refactor the whole component
    if (prevState.width && prevState.width !== this.state.width) {
      this.setState({width: this.state.width}); //Force re-render if width changes
    }
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
            key={'layer-'+ current + '-' + key}
            layerId={current}
            title={config.layers[current].title}
            subtitle={renderHTML(config.layers[current].subtitle)}
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
    return(
      <AutoSizer>
        {({ width, height }) => (
          <List
            deferredMeasurementCache={this._cache}
            id="flat-layer-list"
            width={width - 10}
            height={height}
            overscanRowCount={5}
            ref={ref=>this._setListRef(ref)}
            rowCount={this.state.layerFilter.length}
            rowHeight={this._cache.rowHeight}
            scrollToAlignment="auto"
            rowRenderer={row=>this._rowRenderer(row)}
          />
        )}
      </AutoSizer>
    );
  }
  _setListRef (ref) { this._layerList = ref; }
}
