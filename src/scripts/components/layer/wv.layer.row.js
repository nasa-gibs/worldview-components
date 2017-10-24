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
    var { onState, offState, layerId } = this.props;
    if (checked) offState(layerId);
    if (!checked) onState(layerId);
    this.setState({checked: !checked});
  }
  componentDidMount(){
    var { description, isDescriptionLoaded, updateDescriptions, hasBeenRequested, addToRequestPool, rowIndex} = this.props;
    if(description && !isDescriptionLoaded && !hasBeenRequested) {
      addToRequestPool(rowIndex);
      var request = new XMLHttpRequest();
      request.open('GET', 'config/metadata/' + this.props.description + '.html', true);

      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          let data = request.responseText;
          updateDescriptions(rowIndex, data);
        } else {
          // We reached our target server, but it returned an error
        }
      };

      request.onerror = function() {
        // There was a connection error of some sort
      };

      request.send();
    }
  }
  /*
   * Toggle switch for the metadata info button and close arrow
   * @method toggleMetadataButtons
   * @param {e} event
   * @return {void}
   */
  toggleMetadataButtons (e) {
    e.stopPropagation(); // Prevent layer from being activated
    var { onChange, rowIndex, layerId, toggleExpansion } = this.props;
    this.setState({isExpanded: !this.state.isExpanded});
    onChange(rowIndex);
    toggleExpansion(layerId);
  }

  render() {
    return(
      <div id={'wrapper-' + this.props.layerId} style={this.props.style}>
        <div className='layers-all-layer' data-layer={this.props.layerId}>
          <div className='layers-all-header' onClick={()=>this.toggleCheck()}>
            <Checkbox
              id={'checkbox-' + this.props.layerId}
              data-layer={this.props.layerId}
              checkboxClass="icheckbox_square-red iCheck iCheck-checkbox"
              increaseArea="20%"
              checked={this.state.checked}
              onChange={()=>this.toggleCheck()}
            />
            <div className="layers-all-title-wrap">
              <h3>
                {this.props.title}
                {this.props.metadata &&
                  <span
                    className="fa fa-info-circle"
                    onClick={(e)=>this.toggleMetadataButtons(e)}
                  ></span>
                }
              </h3>
              <h5>{renderHTML(this.props.subtitle+'') /* Force a string because renderHTML fails on other types */}</h5>
            </div>
          </div>
          {this.props.metadata && this.state.isExpanded &&
            <div className="source-metadata visible">
              {renderHTML(this.props.metadata+'') /* Force a string because renderHTML fails on other types */}
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
  isEnabled: PropTypes.bool,
  isExpanded: PropTypes.bool,
  onState: PropTypes.func,
  offState: PropTypes.func,
  onChange: PropTypes.func,
  layerId: PropTypes.string,
  rowIndex: PropTypes.number,
  toggleExpansion: PropTypes.func,
  style: PropTypes.object,
  title: PropTypes.string,
  metadata: PropTypes.string,
  subtitle: PropTypes.string,
  description: PropTypes.string,
  isDescriptionLoaded: PropTypes.bool,
  updateDescriptions: PropTypes.func,
  hasBeenRequested: PropTypes.bool,
  addToRequestPool: PropTypes.func
};

export default LayerRow;
