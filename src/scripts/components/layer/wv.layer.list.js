import React from 'react';
import PropTypes from 'prop-types';
import LayerRow from './wv.layer.row.js';
import 'whatwg-fetch'; // fetch() polyfill for IE

/*
 * A scrollable list of layers
 * @class LayerList
 * @extends React.Component
 */
class LayerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredLayers: props.filteredLayers,
      expandedLayers: []
    };
  }

  /*
   * Toggles expansion of metadata for a layer given that layer's ID and makes
   * an AJAX request for the metadata if it's missing
   *
   * @method toggleExpansion
   * @param {string} layer - the layer to be toggled
   * @return {void}
   */
  toggleExpansion(layerId){
    var { filteredLayers, expandedLayers } = this.state;
    var isExpanded = expandedLayers.find(id=>id === layerId);
    if (isExpanded) {
      expandedLayers = expandedLayers.filter(id=>id !== layerId);
    } else {
      expandedLayers.push(layerId);
      this.setState({expandedLayers: expandedLayers});
      var layer = filteredLayers.find(l=>l.id === layerId);
      if (!layer.metadata) {
        var { origin, pathname } = window.location;
        var uri = `${origin}${pathname}config/metadata/${layer.description}.html`;
        fetch(uri).then(res=> {
          return res.ok?res.text():'There was an error loading the metadata.';
        }).then(body=>{
          layer.metadata = body;
          this.setState({layers: filteredLayers});
        });
      }
    }
  }

  render() {
    var { filteredLayers, expandedLayers } = this.state;
    var { activeLayers, addLayer, removeLayer } = this.props;
    return(
      <div style={{
          height: '100%',
          overflowY: 'scroll',
          msOverflowStyle: 'scrollbar',
          WebkitOverflowScrolling: 'touch'
        }}>
        {(filteredLayers.length < 1)?<div>No results.</div>:null}
        {filteredLayers.map((layer)=>{
          var isEnabled = activeLayers.some(l=>l.id === layer.id);
          var isExpanded = expandedLayers.includes(layer.id);
          return <LayerRow
            key={layer.id}
            layer={layer}
            isEnabled={isEnabled}
            isExpanded={isExpanded}
            onState={addLayer}
            offState={removeLayer}
            toggleExpansion={id=>this.toggleExpansion(id)}
          />
        })}
      </div>
    );
  }
  _setListRef (ref) { this._layerList = ref; }
}

LayerList.propTypes = {
  addLayer: PropTypes.func,
  removeLayer: PropTypes.func,
  activeLayers: PropTypes.array,
  filteredLayers: PropTypes.array
}

export default LayerList;
