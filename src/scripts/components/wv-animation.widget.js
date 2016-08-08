import React from 'react';
import InputRange from 'react-input-range';

export default class AnimationWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state =  {
      value:10,
      loop: false
    };
  }
  onSlide(component, value) {
    this.setState({
      value: value
    });
  }
  onLoop() {
    var loop = this.state.loop;
    if(loop) {
      this.setState({
        loop: false
      });
    } else {
      this.setState({
        loop: true
      });
    }

  }
  play() {
    this.props.callback({
      framerate: this.state.value,
      loop: this.state.loop,
      share: this.props.share
    });

  }
  render() {
    return(

      <div id="wv-animation-widget" className="wv-animation-widget">
        <a href="javascript:void(null)" title="Share Animation GIF" className="wv-icon-case">
          <i className="fa fa-file-video-o wv-animation-widget-icon"/>
        </a>
        <div className="wv-slider-case">
          <InputRange maxValue={60} minValue={0} value={this.state.value} onChange={this.onSlide.bind(this)} />
          <span className="wv-slider-label">{this.props.label}</span>
        </div>
        <a href="javascript:void(null)" title="click if you would like to loop the video" className={this.state.loop ? ' wv-icon-case wv-loop-icon-case wv-loop-active' : 'wv-loop-icon-case wv-icon-case' } >
          <i className="fa fa-refresh wv-animation-widget-icon" onClick={this.onLoop.bind(this)} />
        </a>
        <a href="javascript:void(null)" title="Play video" className='wv-anim-play-case wv-icon-case' onClick={this.play.bind(this)}>
          <i className='fa fa-play wv-animation-widget-icon' />
        </a>
      </div>
    );
  }

}