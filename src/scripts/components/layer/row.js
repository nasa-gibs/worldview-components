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
    var dateRange, startDate, startDateId, endDate, endDateId;
    if (layer.startDate) {
      startDate = util.parseDate(layer.startDate);
      if (layer.period !== 'subdaily') {
        startDate = startDate.getDate() + ' ' + util.giveMonth(startDate) + ' ' +
         startDate.getFullYear();
      } else {
        startDate = startDate.getDate() + ' ' + util.giveMonth(startDate) + ' ' +
        startDate.getFullYear() + ' ' + util.pad(startDate.getHours(), 2, '0') + ':' +
        util.pad(startDate.getMinutes(), 2, '0');
      }
      if (layer.id) startDateId = layer.id + '-startDate';

      if (layer.endDate) {
        if (layer.period !== 'subdaily') {
          endDate = endDate.getDate() + ' ' + util.giveMonth(endDate) + ' ' +
          endDate.getFullYear();
        } else {
          endDate = endDate.getDate() + ' ' + util.giveMonth(endDate) + ' ' +
          endDate.getFullYear() + ' ' + util.pad(endDate.getHours(), 2, '0') + ':' +
          util.pad(endDate.getMinutes(), 2, '0');
        }
      } else {
        endDate = 'Present';
      }
      if (layer.id) endDateId = layer.id + '-endDate';
    }

    dateRange = '<p>Temporal coverage: <span class="layer-date-start" id=' +
    startDateId + '>' + startDate + '</span> - <span class="layer-end-date" id=' +
    endDateId + '>' + endDate + '</span></p>';

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
