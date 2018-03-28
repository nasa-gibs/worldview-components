import React from 'react';
import PropTypes from 'prop-types';
import DateInputColumn from './input';
import Util from '../util/util';

const util = new Util();

/*
 * A react component, is a draggable svg
 * group. It is a parent component that
 * rerenders when child elements are dragged
 *
 * @class TimelineRangeSelector
 */
class dateSelector extends React.Component {
  /*
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      date: props.date,
      maxDate: props.maxDate,
      minDate: props.minDate,
      tab: null,
      maxZoom: props.maxZoom
    };
  }
  componentWillReceiveProps(props) {
    this.setState({
      date: props.date,
      maxDate: props.maxDate,
      minDate: props.minDate,
      maxZoom: props.maxZoom
    });
  }
  blur() {
    this.setState({tab: null});
  }
  nextTab(index) {
    var nextTab;
    var maxTab;
    if (this.state.maxZoom >= 4) {
      maxTab = 5;
    } else {
      maxTab = 3;
    }
    if (index < maxTab) {
      nextTab = index + 1;
    } else {
      nextTab = 1;
    }
    this.setState({
      tab: nextTab
    });
  }
  updateDate(date) {
    this.setState({
      date: date
    });
    this.props.onDateChange(this.props.id, date);
  }
  renderSubdaily() {
    if (this.state.maxZoom >= 4) {
      return (
        <React.Fragment>
          <DateInputColumn
            step={1}
            startDate={new Date(2000)}
            today={new Date()}
            date={this.state.date}
            type="hour"
            height={this.props.height}
            width={this.props.width}
            updateDate={this.updateDate.bind(this)}
            value={util.pad(this.state.date.getUTCHours(), 2, '0')}
            tabIndex={4}
            focused={(this.state.tab === 4)}
            nextTab={this.nextTab.bind(this)}
            maxDate={this.props.maxDate}
            minDate={this.props.minDate}
            blur={this.blur.bind(this)}
          />
          <div className="input-time-divider">:</div>
          <DateInputColumn
            step={10}
            startDate={new Date(2000)}
            today={new Date()}
            date={this.state.date}
            type="minute"
            height={this.props.height}
            width={this.props.width}
            updateDate={this.updateDate.bind(this)}
            value={util.pad(this.state.date.getUTCMinutes(), 2, '0')}
            tabIndex={5}
            focused={(this.state.tab === 5)}
            nextTab={this.nextTab.bind(this)}
            maxDate={this.props.maxDate}
            minDate={this.props.minDate}
            blur={this.blur.bind(this)}
          />
          <div className="input-time-zmark">Z</div>
        </React.Fragment>
      );
    }
  }
  render() {
    return (
      <div className="wv-date-selector-widget">
        <DateInputColumn
          step={1}
          startDate={new Date(2000)}
          today={new Date()}
          date={this.state.date}
          value={this.state.date.getUTCFullYear()}
          type="year"
          height={this.props.height}
          width={this.props.width}
          updateDate={this.updateDate.bind(this)}
          tabIndex={1}
          focused={(this.state.tab === 1)}
          nextTab={this.nextTab.bind(this)}
          maxDate={this.props.maxDate}
          minDate={this.props.minDate}
          blur={this.blur.bind(this)} />
        <DateInputColumn
          step={1}
          startDate={new Date(2000)}
          today={new Date()}
          date={this.state.date}
          value={util.monthStringArray[this.state.date.getUTCMonth()]}
          type="month"
          height={this.props.height}
          width={this.props.width}
          updateDate={this.updateDate.bind(this)}
          tabIndex={2}
          focused={(this.state.tab === 2)}
          nextTab={this.nextTab.bind(this)}
          maxDate={this.props.maxDate}
          minDate={this.props.minDate}
          blur={this.blur.bind(this)}
        />
        <DateInputColumn
          step={1}
          startDate={new Date(2000)}
          today={new Date()}
          date={this.state.date}
          type="day"
          height={this.props.height}
          width={this.props.width}
          updateDate={this.updateDate.bind(this)}
          value={util.pad(this.state.date.getUTCDate(), 2, '0')}
          tabIndex={3}
          focused={(this.state.tab === 3)}
          nextTab={this.nextTab.bind(this)}
          maxDate={this.props.maxDate}
          minDate={this.props.minDate}
          blur={this.blur.bind(this)}
        />
        {this.renderSubdaily()}
      </div>
    );
  }
}

dateSelector.propTypes = {
  date: PropTypes.object,
  maxDate: PropTypes.object,
  minDate: PropTypes.object,
  maxZoom: PropTypes.number,
  onDateChange: PropTypes.func,
  id: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string
};

export default dateSelector;
