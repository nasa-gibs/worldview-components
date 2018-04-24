import React from 'react';
import PropTypes from 'prop-types';
import Util from '../util/util.js';

const util = new Util();

/**
 * A single layer search result row
 * @class LayerRow
 * @extends React.Component
 */
class LayerRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: props.isEnabled,
      isExpanded: props.isExpanded
    };
  }

  /**
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

  /**
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

  /**
   * dateRangeText - Return text with the temporal range based on layer start
   * and end dates
   *
   * @method toggleMetadataButtons
   * @param  {object} layer the layer object
   * @return {string}       Return a string with temporal range information
   */
  dateRangeText(layer) {
    var dateRange, dateStart, dateStartId, dateEnd, dateEndId;
    if (layer.startDate) {
      if (layer.period !== 'subdaily') {
        layer.startDate = util.toISOStringDate(util.parseDateUTC(layer.startDate));
      }
      dateStart = layer.startDate;
      if (layer.id) dateStartId = layer.id + '-startDate';

      if (layer.endDate) {
        if (layer.period !== 'subdaily') {
          layer.endDate = util.toISOStringDate(util.parseDateUTC(layer.endDate));
        }
        dateEnd = layer.endDate;
      } else {
        dateEnd = 'Present';
      }
      if (layer.id) dateEndId = layer.id + '-endDate';
    }

    dateRange = '<p>Temporal coverage: <span class="layer-date-start" id=' +
    dateStartId + '>' + dateStart + '</span> - <span class="layer-end-date" id=' +
    dateEndId + '>' + dateEnd + '</span></p>';

    return dateRange;
  }

  componentWillReceiveProps(nextProps) {
    this.state = {
      checked: nextProps.isEnabled,
      isExpanded: nextProps.isExpanded
    };
  }

  render() {
    var { checked, isExpanded } = this.state;
    var { layer } = this.props;
    var { title, description, subtitle, metadata } = layer;
    var headerClass = 'layers-all-header has-checkbox';
    if (checked) headerClass += ' checked';
    return (
      <div className='layers-all-layer'>
        <div className={headerClass} onClick={() => this.toggleCheck()}>
          <h3>{title}
            {description && <span
              className="fa fa-info-circle"
              onClick={e => this.toggleMetadataButtons(e)}
            />}
          </h3>
          {subtitle && <h5>{subtitle}</h5>}
        </div>
        {isExpanded && metadata &&
          <div className="source-metadata visible">
            <div dangerouslySetInnerHTML={{__html: this.dateRangeText(layer) + metadata}} />
            <div className="metadata-more" onClick={e => this.toggleMetadataButtons(e)}>
              <span className="ellipsis up">^</span>
            </div>
          </div>
        }
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
