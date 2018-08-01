import React from 'react';
import PropTypes from 'prop-types';
import LayerList from './layer-list';
import Scrollbars from '../../util/scrollbar';

class Products extends React.Component {
  render() {
    const { activeOverlays, isActive, layerGroupName, height } = this.props;
    const outterClass = 'layer-container sidebar-panel';
    return (
      <Scrollbars style={{ maxHeight: height + 'px' }}>
        <div
          className={isActive ? outterClass : 'hidden ' + outterClass}
          style={{ display: isActive ? 'block' : 'none' }}
        >
          <LayerList
            title="Overlays"
            groupId="overlays"
            layerGroupName={layerGroupName}
            layers={activeOverlays.overlays}
          />
          <LayerList
            title="Baselayers"
            groupId="baselayers"
            layerGroupName={layerGroupName}
            layers={activeOverlays.baselayers}
          />
        </div>
      </Scrollbars>
    );
  }
}
Products.propTypes = {
  activeOverlays: PropTypes.object,
  palettePromise: PropTypes.func
};

export default Products;
