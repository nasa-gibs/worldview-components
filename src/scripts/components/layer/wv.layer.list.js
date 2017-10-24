import React from 'react';
import PropTypes from 'prop-types';
import LayerRow from './wv.layer.row.js';

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
      expandedLayers: [],
      isMetadataLoaded: props.isMetadataLoaded
    };
  }

  /*
   * Toggles expansion of metadata for a layer given that layer's ID
   * @method toggleExpansion
   * @param {string} layer - the layer to be toggled
   * @return {void}
   */
  toggleExpansion(layerId){
    var { expandedLayers } = this.state;
    var index = expandedLayers.indexOf(layerId);
    if(index > -1){
      expandedLayers.splice(index, 1); // Removes layer from expanded list
    } else {
      expandedLayers.push(layerId);
    }
    this.setState({ expandedLayers: expandedLayers });
  }

  render() {
    var { layers, isMetadataLoaded, expandedLayers } = this.state;
    var { model } = this.props;
    return(
      <div style={{overflowY: 'scroll', height: '100%'}}>
        {(layers.length < 1)
          ? <div>No results.</div>
          : (!isMetadataLoaded)
            ? <div>Loading layer descriptions...</div>
            : null
        }
        {layers.map((layer)=>{
          var isEnabled = model.active.map(l=>l.id).includes(layer.id);
          var isExpanded = expandedLayers.includes(layer.id);
          return <LayerRow
            key={layer.id}
            layerId={layer.id}
            title={layer.title}
            subtitle={layer.subtitle}
            isEnabled={isEnabled}
            metadata={layer.metadata}
            toggleExpansion={layerId=>this.toggleExpansion(layerId)}
            isExpanded={isExpanded}
            style={{paddingTop:5}}
            onState={model.add}
            offState={model.remove}
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
  layers: PropTypes.array,
  isMetadataLoaded: PropTypes.bool
}

export default LayerList;
