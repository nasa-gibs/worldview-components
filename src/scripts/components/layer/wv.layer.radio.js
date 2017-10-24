import React from 'react';
import {Checkbox} from 'react-icheck';
import renderHTML from 'react-render-html';

/*
 * A react component, Builds a toggle on/off layer selector
 * @class LayerRadio
 * @extends React.Component
 */
export default class LayerRadio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.enabled || false,
      metadataIsVisible: this.props.expanded || false,
      metadata: null
    };
    this.toggleMetadataButtons = this.toggleMetadataButtons.bind(this);
    this.toggleCheck = this.toggleCheck.bind(this);
    this.updateMetadata = this.updateMetadata.bind(this);
  }

  updateMetadata(data) {
    this.setState({
      metadata: data,
    });
  }

  componentWillMount(){
    var self = this;
    // console.log(self);
    if(this.props.description){
      var request = new XMLHttpRequest();
      request.open('GET', 'config/metadata/' + this.props.description + '.html', true);

      var loadMetadata = function(data) {
        self.updateMetadata(data);
      };

      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          var data = request.responseText;
          loadMetadata(data);
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
  /*
   * Toggle switch for the metadata info button and close arrow
   * @method toggleMetadataButtons
   * @param {e} event
   * @return {void}
   */
  toggleMetadataButtons (e) {
    e.stopPropagation();
    var { metadataIsVisible } = this.state;
    var { onChange, rowIndex, layerId, expand } = this.props;
    this.setState({
      metadataIsVisible: !metadataIsVisible,
      metadataVisibility: metadataIsVisible ? 'visible' : 'hidden'
    });
    onChange(rowIndex);
    expand(layerId);
  }
  render() {
    // if(this.state.metadata) console.log(this.state.metadata);
    return(
      <div
        id={'wrapper-' + this.props.layerId}
        style={this.props.style}
        >
        <div
          className='layers-all-layer'
          data-layer={this.props.layerId}>
          <div className='layers-all-header'
            onClick={this.toggleCheck}>
            <Checkbox
              id={'checkbox-' + this.props.layerId}
              data-layer={this.props.layerId}
              checkboxClass="icheckbox_square-red iCheck iCheck-checkbox"
              increaseArea="20%"
              checked={this.state.checked}
              onChange={this.toggleCheck}
              />
            <div className="layers-all-title-wrap">
              <h3>
                {this.props.title}
                {this.state.metadata &&
                  <span
                    className="fa fa-info-circle"
                    onClick={this.toggleMetadataButtons}
                    >
                  </span>
                }
              </h3>
              <h5>{this.props.subtitle}</h5>
            </div>
          </div>
          {this.state.metadata &&
            <div className={"source-metadata " + (this.state.metadataIsVisible ? 'visible' : 'hidden')}>
              {renderHTML(this.state.metadata)}
              <div className="metadata-more" onClick={this.toggleMetadataButtons}>
                <span className="ellipsis up">^</span>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}
