import React from 'react';
import PropTypes from 'prop-types';
import {Checkbox} from 'react-icheck';
import renderHTML from 'react-render-html';

/*
 * A single layer search result row
 * @class LayerRow
 * @extends React.Component
 */
class LayerRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.isEnabled,
      isExpanded: this.props.isExpanded
    };
  }

  /*
   * Toggle switch for the iCheck layer adder/remover
   * @method toggleCheck
   * @return {void}
   */
  toggleCheck() {
    var { checked } = this.state;
    var { onState, offState, layer } = this.props;
    if (checked) offState(layer.id);
    if (!checked) onState(layer.id);
    this.setState({checked: !checked});
  }

  /*
   * Toggle switch for the metadata info button and close arrow
   * @method toggleMetadataButtons
   * @param {e} event
   * @return {void}
   */
  toggleMetadataButtons (e) {
    e.stopPropagation(); // Prevent layer from being activated
    var { layer, toggleExpansion } = this.props;
    this.setState({isExpanded: !this.state.isExpanded});
    toggleExpansion(layer.id);
  }

  render() {
    var { checked, isExpanded } = this.state;
    var { layer, style } = this.props;
    var { id, title, description, subtitle, metadata } = layer;
    return(
      <div id={'wrapper-' + id} style={style}>
        <div className='layers-all-layer' data-layer={id}>
          <div className='layers-all-header' onClick={()=>this.toggleCheck()}>
            <Checkbox
              id={'checkbox-' + id}
              data-layer={id}
              checkboxClass="icheckbox_square-red iCheck iCheck-checkbox"
              increaseArea="20%"
              checked={checked}
              onChange={()=>this.toggleCheck()}
            />
            <div className="layers-all-title-wrap">
              <h3>
                {title}
                {description &&
                  <span
                    className="fa fa-info-circle"
                    onClick={(e)=>this.toggleMetadataButtons(e)}
                  ></span>
                }
              </h3>
              <h5>{renderHTML(subtitle+'') /* Force a string because renderHTML fails on other types */}</h5>
            </div>
          </div>
          {isExpanded && metadata &&
            <div className="source-metadata visible">
              {renderHTML(metadata+'') /* Force a string because renderHTML fails on other types */}
              <div className="metadata-more" onClick={(e)=>this.toggleMetadataButtons(e)}>
                <span className="ellipsis up">^</span>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

LayerRow.propTypes = {
  layer: PropTypes.object,
  isEnabled: PropTypes.bool,
  isExpanded: PropTypes.bool,
  onState: PropTypes.func,
  offState: PropTypes.func,
  toggleExpansion: PropTypes.func,
  style: PropTypes.object
};

export default LayerRow;
