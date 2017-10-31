import React from 'react';
import PropTypes from 'prop-types';
import DateInputColumn from './wv.dateselector.input';
import Utils from '../util/wv.utils';

const util = new Utils();

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
      tab: null
    };
  }
  componentWillReceiveProps(props) {
    this.setState({
      date: props.date,
      maxDate: props.maxDate,
      minDate: props.minDate
    });
  }
  blur() {
    this.setState({tab: null});
  }
  nextTab(index) {
    var nextTab;
    if (index < 3) {
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
  render() {
    return (
      <div className="wv-date-selector-widget">
        <DateInputColumn startDate={new Date(2000)}
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
          startDate={new Date(2000)}
          today={new Date()} date={this.state.date}
          type="month" height={this.props.height}
          width={this.props.width}
          updateDate={this.updateDate.bind(this)}
          value={util.monthStringArray[this.state.date.getUTCMonth()]}
          tabIndex={2}
          focused={(this.state.tab === 2)}
          nextTab={this.nextTab.bind(this)}
          maxDate={this.props.maxDate}
          minDate={this.props.minDate}
          blur={this.blur.bind(this)}
        />
        <DateInputColumn
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
      </div>
    );
  }
}

dateSelector.propTypes = {
  date: PropTypes.object,
  maxDate: PropTypes.object,
  minDate: PropTypes.object,
  onDateChange: PropTypes.func,
  id: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string
};

export default dateSelector;
