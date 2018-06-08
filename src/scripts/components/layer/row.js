import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'reactstrap';
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
      isMetadataExpanded: props.isMetadataExpanded,
      isDateRangesExpanded: props.isDateRangesExpanded
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
    var { layer, toggleMetadataExpansion } = this.props;
    this.setState({isMetadataExpanded: !this.state.isMetadataExpanded});
    toggleMetadataExpansion(layer.id);
  }

  /**
   * Toggle switch for the metadata info button and close arrow
   * @method toggleMetadataButtons
   * @param {e} event
   * @return {void}
   */
  toggleDateRanges (e) {
    e.stopPropagation(); // Prevent layer from being activated
    var { layer, toggleDateRangesExpansion } = this.props;
    this.setState({isDateRangesExpanded: !this.state.isDateRangesExpanded});
    toggleDateRangesExpansion(layer.id);
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
    var startDate, startDateId, endDate, endDateId;
    var dateRange = '';
    if (layer.startDate) {
      startDate = util.parseDate(layer.startDate);
      if (layer.period === 'subdaily') {
        startDate = startDate.getDate() + ' ' + util.giveMonth(startDate) + ' ' +
        startDate.getFullYear() + ' ' + util.pad(startDate.getHours(), 2, '0') + ':' +
        util.pad(startDate.getMinutes(), 2, '0');
      } else if (layer.period === 'yearly') {
        startDate = startDate.getFullYear();
      } else if (layer.period === 'monthly') {
        startDate = util.giveMonth(startDate) + ' ' + startDate.getFullYear();
      } else {
        startDate = startDate.getDate() + ' ' + util.giveMonth(startDate) + ' ' +
        startDate.getFullYear();
      }
      if (layer.id) startDateId = layer.id + '-startDate';

      if (layer.endDate) {
        endDate = util.parseDate(layer.endDate);
        if (layer.period === 'subdaily') {
          endDate = endDate.getDate() + ' ' + util.giveMonth(endDate) + ' ' +
          endDate.getFullYear() + ' ' + util.pad(endDate.getHours(), 2, '0') + ':' +
          util.pad(endDate.getMinutes(), 2, '0');
        } else if (layer.period === 'yearly') {
          endDate = endDate.getFullYear();
        } else if (layer.period === 'monthly') {
          endDate = util.giveMonth(endDate) + ' ' + endDate.getFullYear();
        } else {
          endDate = endDate.getDate() + ' ' + util.giveMonth(endDate) + ' ' +
          endDate.getFullYear();
        }
      } else {
        endDate = 'Present';
      }
      if (layer.id) endDateId = layer.id + '-endDate';
      dateRange = 'Temporal coverage: <span class="layer-date-start" id=' +
      startDateId + '>' + startDate + '</span> - <span class="layer-end-date" id=' +
      endDateId + '>' + endDate + '</span>';
    }

    return dateRange;
  }

  componentWillReceiveProps(nextProps) {
    this.state = {
      checked: nextProps.isEnabled,
      isMetadataExpanded: nextProps.isMetadataExpanded,
      isDateRangesExpanded: nextProps.isDateRangesExpanded
    };
  }

  render() {
    var { checked, isMetadataExpanded, isDateRangesExpanded } = this.state;
    var { layer } = this.props;
    var { title, description, subtitle, metadata } = layer;
    var listItems;
    var headerClass = 'layers-all-header has-checkbox';
    if (layer.dateRanges && layer.dateRanges.length > 1) {
      let firstDateRange = true;
      listItems = layer.dateRanges.slice(0).reverse().map((l) => {
        let startDate = util.parseDate(l.startDate);
        let endDate = util.parseDate(l.endDate);

        if (layer.period === 'subdaily') {
          let listItemStartDate = (startDate).getDate() + ' ' + util.giveMonth(startDate) + ' ' +
          (startDate).getFullYear() + ' ' + util.pad((startDate).getHours(), 2, '0') + ':' +
          util.pad((startDate).getMinutes(), 2, '0');

          let listItemEndDate = (endDate).getDate() + ' ' +
          util.giveMonth(endDate) + ' ' + (endDate).getDate() + ' ' + util.giveMonth(endDate) + ' ' +
          (endDate).getFullYear() + ' ' + util.pad((endDate).getHours(), 2, '0') + ':' +
          util.pad((endDate).getMinutes(), 2, '0');

          if (firstDateRange) {
            if (layer.endDate === undefined) {
              listItemEndDate = 'Present';
            }
            firstDateRange = false;
          }

          return <ListGroupItem key={l.startDate + ' - ' + l.endDate}>
            {listItemStartDate + ' - ' + listItemEndDate}
          </ListGroupItem>;
        } else if (layer.period === 'yearly' && l.startDate === l.endDate) {
          let listItemStartDate = (startDate).getFullYear();

          return <ListGroupItem key={l.startDate}>
            {listItemStartDate}
          </ListGroupItem>;
        } else if (layer.period === 'yearly') {
          let listItemStartDate = (startDate).getFullYear();
          let listItemEndDate = (endDate).getFullYear();

          if (firstDateRange) {
            if (layer.endDate === undefined) {
              listItemEndDate = 'Present';
            }
            firstDateRange = false;
          }

          return <ListGroupItem key={l.startDate}>
            {listItemStartDate + ' - ' + listItemEndDate}
          </ListGroupItem>;
        } else if (layer.period === 'monthly' && l.startDate === l.endDate) {
          let listItemStartDate = util.giveMonth(startDate) + ' ' + (startDate).getFullYear();

          return <ListGroupItem key={l.startDate}>
            {listItemStartDate}
          </ListGroupItem>;
        } else if (layer.period === 'monthly') {
          let listItemStartDate = util.giveMonth(startDate) + ' ' + (startDate).getFullYear();
          let listItemEndDate = util.giveMonth(endDate) + ' ' + (endDate).getFullYear();

          if (firstDateRange) {
            if (layer.endDate === undefined) {
              listItemEndDate = 'Present';
            }
            firstDateRange = false;
          }

          return <ListGroupItem key={l.startDate}>
            {listItemStartDate + ' - ' + listItemEndDate}
          </ListGroupItem>;
        } else if (layer.period === 'daily' && l.startDate === l.endDate) {
          let listItemStartDate = (startDate).getDate() + ' ' +
          util.giveMonth(startDate) + ' ' + (startDate).getFullYear();

          return <ListGroupItem key={l.startDate + ' - ' + l.endDate}>
            {listItemStartDate}
          </ListGroupItem>;
        } else {
          let listItemStartDate = (startDate).getDate() + ' ' +
          util.giveMonth(startDate) + ' ' + (startDate).getFullYear();
          let listItemEndDate = (endDate).getDate() + ' ' +
          util.giveMonth(endDate) + ' ' + (endDate).getFullYear();

          if (firstDateRange) {
            if (layer.endDate === undefined) {
              listItemEndDate = 'Present';
            }
            firstDateRange = false;
          }

          return <ListGroupItem key={l.startDate + ' - ' + l.endDate}>
            {listItemStartDate + ' - ' + listItemEndDate}
          </ListGroupItem>;
        }
      });
    }
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
        {isMetadataExpanded && metadata &&
          <div className="source-metadata visible">
            {layer.startDate &&
            <p className="layer-date-range">
              <span dangerouslySetInnerHTML={{__html: this.dateRangeText(layer)}} />
              {layer.dateRanges && layer.dateRanges.length > 1 &&
                <a id="layer-date-ranges-button" title="View all date ranges" className="layer-date-ranges-button" onClick={e => this.toggleDateRanges(e)}> <sup>*View Dates</sup></a>
              }
            </p>
            }
            {isDateRangesExpanded &&
            <div className='layer-date-wrap'>
              <p>Date Ranges:</p>
              <ListGroup className='layer-date-ranges'>
                {listItems}
              </ListGroup>
            </div>
            }
            <div dangerouslySetInnerHTML={{__html: metadata}} />
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
  isMetadataExpanded: PropTypes.bool,
  isDateRangesExpanded: PropTypes.bool,
  onState: PropTypes.func,
  offState: PropTypes.func,
  toggleMetadataExpansion: PropTypes.func,
  toggleDateRangesExpansion: PropTypes.func
};

export default LayerRow;
