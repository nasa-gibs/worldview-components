import React from 'react';
import PropTypes from 'prop-types';
import Util from '../util/wv.utils';

const util = new Util();

/*
 * A react component, is a draggable svg
 * group. It is a parent component that
 * rerenders when child elements are dragged
 *
 * @class TimelineRangeSelector
 */
class DateInputColumn extends React.Component {
  /*
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      valid: true
    };
    this.inputs = [];
  }
  componentDidUpdate() {
    if (this.props.focused) {
      this.inputs[this.props.tabIndex].focus();
    }
  }
  componentWillMount() {
    var size;
    var type;
    type = this.props.type;
    if (type === 'year') {
      size = '4';
    } else if (type === 'day') {
      size = 2;
    } else {
      size = 3;
    }
    this.size = size;
  }
  componentWillReceiveProps(props) {
    this.setState({value: props.value});
  }
  onKeyPress(e) {
    var kc = e.keyCode;
    if (kc === 9 || // tab
      kc === 13) { // enter
      e.preventDefault();
      e.stopPropagation();
    }
  }
  onKeyUp(e) {
    var keyCode = e.keyCode;
    var value = e.target.value;
    var newDate;
    var entered = (keyCode === 13 || keyCode === 9);
    if (keyCode === 38) { // up
      e.preventDefault();
      this.onClickUp();
      return;
    }
    if (keyCode === 40) { // down
      e.preventDefault();
      this.onClickDown();
      return;
    }
    if (e.type === 'focusout' || entered) {
      if (this.props.type === 'year' || this.props.type === 'day') {
        if (!((keyCode >= 48 && keyCode <= 57) || entered || keyCode === 8)) {
          return;
        }
      }
      switch (this.props.type) {
        case 'year':
          newDate = this.yearValidation(value);
          break;
        case 'month':
          newDate = this.monthValidation(value);
          break;
        case 'day':
          newDate = this.dayValidation(value);
          break;
        case 'hour':
          newDate = this.hourValidation(value);
          break;
        case 'minute':
          newDate = this.minuteValidation(value);
          break;
      }
      if (newDate) {
        this.props.updateDate(newDate);
        if (entered) { // if enetered or tabbed
          this.nextTab();
        }
      } else if (entered) {
        this.setState({
          valid: false
        });
      }
    }
  }
  onClickUp() {
    this.rollDate(1);
    this.setState({
      valid: true
    });
  }
  onClickDown() {
    this.rollDate(-1);
    this.setState({
      valid: true
    });
  }
  yearValidation(input) {
    var newDate;
    if ((input > 1000) && (input < 9999)) {
      newDate = new Date((new Date(this.props.date)).setUTCFullYear(input));
      return this.validateDate(newDate);
    }
  }

  monthValidation(input) {
    var newDate;
    if ((!isNaN(input)) && input < 13 && input > 0) {
      newDate = new Date((new Date(this.props.date)).setUTCMonth(input - 1));
      if (newDate) {
        this.setState({
          value: util.monthStringArray[input - 1]
        });
        return this.validateDate(newDate);
      }
    } else {
      let realMonth;
      realMonth = util.stringInArray(util.monthStringArray, input);
      if (realMonth !== false) {
        newDate = new Date((new Date(this.props.date)).setUTCMonth(realMonth));
        return this.validateDate(newDate);
      } else {
        return false;
      }
    }
  }

  dayValidation(input) {
    var newDate;
    var maxDate;
    var currentDate = this.props.date;

    maxDate = new Date(currentDate.getYear(), currentDate.getMonth() + 1, 0).getDate();

    if (input > 0 && input <= maxDate) {
      newDate = new Date((new Date(currentDate)).setUTCDate(input));
      return this.validateDate(newDate);
    }
  }

  hourValidation(input) {
    var newDate;
    var maxDate;
    var currentDate = this.props.date;

    maxDate = new Date(currentDate.getYear(), currentDate.getMonth() + 1, 0).getDate();

    if (input > 0 && input <= maxDate) {
      newDate = new Date((new Date(currentDate)).setUTCDate(input));
      return this.validateDate(newDate);
    }
  }

  minuteValidation(input) {
    var newDate;
    var maxDate;
    var currentDate = this.props.date;

    maxDate = new Date(currentDate.getYear(), currentDate.getMonth() + 1, 0).getDate();

    if (input > 0 && input <= maxDate) {
      newDate = new Date((new Date(currentDate)).setUTCDate(input));
      return this.validateDate(newDate);
    }
  }

  rollDate(amt) {
    var newDate = util.rollDate(
      this.props.date,
      this.props.type,
      amt,
      this.props.minDate,
      this.props.maxDate
    );
    this.props.updateDate(newDate);
  }

  blur() {
    this.setState({
      value: this.props.value,
      valid: true
    });

    this.props.blur();
  }
  onChange(e) {
    this.setState({
      value: e.target.value.toUpperCase()
    });
  }
  nextTab() {
    this.props.nextTab(this.props.tabIndex);
  }
  validateDate(date) {
    if (date > this.props.minDate && date <= this.props.maxDate) {
      this.setState({
        valid: true
      });
      return date;
    }
    return false;
  }
  render() {
    return (
      <div className="input-wrapper" style={(this.state.valid) ? {} : {borderColor: '#ff0000'}} >
        <div onClick={this.onClickUp.bind(this)} className="date-arrows date-arrow-up" data-interval={this.props.type}>
          <svg width="25" height="8">
            <path d="M 12.5,0 25,8 0,8 z" className="uparrow">
            </path>
          </svg>
        </div>
        <input
          type="text"
          ref={(input) => { this.inputs[this.props.tabIndex] = input; }}
          size={this.size}
          maxLength={this.size}
          className="button-input-group"
          id={this.props.type + '-input-group'}
          value={this.state.value}
          tabIndex={this.props.tabIndex}
          onKeyUp={this.onKeyUp.bind(this)}
          onKeyDown={this.onKeyPress.bind(this) /* currently not working */}
          onChange={this.onChange.bind(this)}
          style={{fontSize: ((this.props.height / 2) + 'px')}}
          onBlur={this.blur.bind(this)}
        />
        <div onClick={this.onClickDown.bind(this)} className="date-arrows date-arrow-down" data-interval={this.props.type}>
          <svg width="25" height="8">
            <path d="M 12.5,0 25,8 0,8 z" className="downarrow"></path>
          </svg>
        </div>
      </div>
    );
  }
}

DateInputColumn.propTypes = {
  value: PropTypes.node,
  focused: PropTypes.bool,
  tabIndex: PropTypes.number,
  type: PropTypes.string,
  updateDate: PropTypes.func,
  date: PropTypes.object,
  minDate: PropTypes.object,
  maxDate: PropTypes.object,
  blur: PropTypes.func,
  nextTab: PropTypes.func,
  height: PropTypes.string
};

export default DateInputColumn;
