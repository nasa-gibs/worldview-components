import React from 'react';
import PropTypes from 'prop-types';

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
   * Toggle layer checked state
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
    var { layer } = this.props;
    var { id, title, description, subtitle, metadata } = layer;
    return(
      <div id={'wrapper-' + id} style={{paddingTop:5}}>
        <div className='layers-all-layer' data-layer={id}>
          <div className={`${checked?'checked':'unchecked'} layers-all-header`} onClick={()=>this.toggleCheck()}>
            <div className="layers-all-title-wrap">
              <h3>
                {title}
                {description &&
                  <span className="fa fa-info-circle" onClick={(e)=>{
                    this.toggleMetadataButtons(e);
                  }}></span>
                }
              </h3>
              {subtitle?<h5 dangerouslySetInnerHTML={{__html: subtitle}} />:null}
            </div>
          </div>
          {isExpanded && metadata &&
            <div className="source-metadata visible">
              <div dangerouslySetInnerHTML={{__html: metadata}} />
              <div className="metadata-more" onClick={(e)=>{
                this.toggleMetadataButtons(e);
              }}>
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
  toggleExpansion: PropTypes.func
};

export default LayerRow;
