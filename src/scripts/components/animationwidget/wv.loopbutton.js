import React from 'react';

/*
 * A react component, Builds a rather specific
 * interactive widget
 *
 * @class AnimationWidget
 * @extends React.Component
 */
export default class LoopButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <a href="javascript:void(null)"
        title={this.props.looping ? "Stop Loop" : "Loop video"}
        className={this.props.looping ? 'wv-loop-icon-case wv-icon-case active' : 'wv-loop-icon-case wv-icon-case'}
        onClick={this.props.onLoop}
      >
        <i className='fa fa-retweet wv-animation-widget-icon' />
      </a>
    );
  }
}
