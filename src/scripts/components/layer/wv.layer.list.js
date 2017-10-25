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
      layers: props.layers,
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
    var { layers, expandedLayers } = this.state;
    var isExpanded = expandedLayers.find(id=>id === layerId);
    if (isExpanded) {
      expandedLayers = expandedLayers.filter(id=>id !== layerId);
    } else {
      expandedLayers.push(layerId);
      this.setState({expandedLayers: expandedLayers});
      var layer = layers.find(l=>l.id === layerId);
      if (!layer.metadata) {
        var { origin, pathname } = window.location;
        var uri = `${origin}${pathname}config/metadata/${layer.description}.html`;
        fetch(uri).then(res=>res.text()).then(body=>{
          layer.metadata = body;
          this.setState({layers: layers});
        });
      }
    }
  }

  render() {
    var { layers, expandedLayers } = this.state;
    var { model } = this.props;
    return(
      <div style={{
          height: '100%',
          overflowY: 'scroll',
          msOverflowStyle: 'scrollbar'
        }}>
        {(layers.length < 1)?<div>No results.</div>:null}
        {layers.map((layer)=>{
          var isEnabled = model.active.map(l=>l.id).includes(layer.id);
          var isExpanded = expandedLayers.includes(layer.id);
          return <LayerRow
            key={layer.id}
            style={{paddingTop:5}}
            layer={layer}
            isEnabled={isEnabled}
            isExpanded={isExpanded}
            onState={model.add}
            offState={model.remove}
            toggleExpansion={id=>this.toggleExpansion(id)}
          />
        })}
      </div>
    );
  }
  _setListRef (ref) { this._layerList = ref; }
}

LayerList.propTypes = {
  config: PropTypes.object,
  model: PropTypes.object,
  layers: PropTypes.array
}

export default LayerList;
