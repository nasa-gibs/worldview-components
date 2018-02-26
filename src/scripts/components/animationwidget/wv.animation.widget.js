import React from 'react';
import PropTypes from 'prop-types';
import InputRange from 'react-input-range';
import TimeSelector from '../dateselector/wv.dateselector';
import LoopButton from './wv.loopbutton';
import PlayButton from './wv.playbutton';
import AnimWidgetHeader from './wv.animation.widget.header';

/*
 * A react component, Builds a rather specific
 * interactive widget
 *
 * @class AnimationWidget
 * @extends React.Component
 */
class AnimationWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.sliderSpeed,
      looping: props.looping,
      startDate: props.startDate,
      endDate: props.endDate,
      currentZoom: props.currentZoom,
      header: props.header,
      incrementArray: props.incrementArray,
      increment: props.increment
    };
  }

  /*
   * Sets a new state value when a
   * when the slider is adjusted
   *
   * @method onSlide
   *
   * @param {number} value - Value of the slider
   *  selection
   *
   * @return {void}
   */
  onSlide(value) {
    this.props.onSlide(value);
    this.setState({
      value: value
    });
  }

  /*
   * calls the callback, passing the
   * current state elements as parameters
   *
   * @method play
   *
   * @return {void}
   */
  play() {
    this.props.onPushPlay();
    this.setState({
      playing: true
    });
  }
  pause() {
    this.props.onPushPause();
    this.setState({
      playing: false
    });
  }
  /*
   * Sets a new state to say whether or not
   * the animation should loop
   *
   * @method onLoop
   *
   * @param {Object} component - slider react
   *  component
   * @param {number} value - Value of the slider
   *  selection
   *
   * @return {void}
   */
  onLoop() {
    var loop = true;
    if (this.state.looping) {
      loop = false;
    }
    this.setState({
      looping: loop
    });
    this.props.onPushLoop(loop);
  }
  onDateChange(id, date) {
    if (id === 'start') {
      this.setState({
        startDate: date
      });
      this.props.onDateChange(
        date,
        this.state.endDate
      );
    } else {
      this.setState({
        endDate: date
      });
      this.props.onDateChange(
        this.state.startDate,
        date
      );
    }
  }
  render() {
    return (
      <div id="wv-animation-widget" className={'wv-animation-widget' + (this.state.currentZoom >= 4 ? ' subdaily' : '')}>
        <AnimWidgetHeader
          text={this.state.increment}
          toolTipTextArray={this.state.incrementArray}
          onClick={this.props.onZoomSelect}/>

        <PlayButton playing={this.state.playing} play={this.play.bind(this)} pause={this.pause.bind(this)} />
        <LoopButton looping={this.state.looping} onLoop={this.onLoop.bind(this)}/>
        <div className="wv-slider-case">
          <InputRange step={0.5} maxValue={10} minValue={0.5} value={this.state.value} onChange={this.onSlide.bind(this)} />
          <span className="wv-slider-label">{this.props.sliderLabel}</span>
        </div>

        <a href="javascript:void(null)"
          title="Create Animated GIF"
          className="wv-icon-case"
          onClick={this.props.onPushGIF}
        >
          <i className="fa fa-file-video-o wv-animation-widget-icon"/>
        </a>
        <div className='wv-anim-dates-case'>
          <TimeSelector
            width="120"
            height="30"
            date={this.state.startDate}
            id='start'
            onDateChange={this.onDateChange.bind(this)}
            maxDate={this.state.endDate}
            minDate={this.props.minDate}
            currentZoom={this.state.currentZoom}
          />
          <div className='thru-label'>To</div>
          <TimeSelector
            width="120"
            height="30"
            date={this.state.endDate}
            id='end'
            onDateChange={this.onDateChange.bind(this)}
            maxDate={this.props.maxDate}
            minDate={this.state.startDate}
            currentZoom={this.state.currentZoom}
          />
        </div>
        <i
          className="fa fa-close wv-close"
          onClick={this.props.onClose}
        />
      </div>

    );
  }
}

AnimationWidget.propTypes = {
  sliderSpeed: PropTypes.number,
  looping: PropTypes.bool,
  startDate: PropTypes.object,
  endDate: PropTypes.object,
  header: PropTypes.element,
  incrementArray: PropTypes.array,
  increment: PropTypes.string,
  onSlide: PropTypes.func,
  onPushPlay: PropTypes.func,
  onPushPause: PropTypes.func,
  onPushLoop: PropTypes.func,
  onDateChange: PropTypes.func,
  onZoomSelect: PropTypes.func,
  sliderLabel: PropTypes.string,
  onPushGIF: PropTypes.func,
  minDate: PropTypes.object,
  maxDate: PropTypes.object,
  currentZoom: PropTypes.number,
  onClose: PropTypes.func
};

export default AnimationWidget;
