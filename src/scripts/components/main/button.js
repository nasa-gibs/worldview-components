import React from 'react';

/*
 * A react component, Builds a rather specific
 * interactive widget
 *
 * @class AnimationWidget
 * @extends React.Component
 */
export default class Button extends React.Component {
  render() {
    return (
      <button
        onClick={this.props.onClick}
        id={this.props.id}
        disabled={(!this.props.valid)}
        className= {(this.props.valid) ? 'wv-button ' + this.props.className : 'wv-disabled wv-button ' + this.props.className}
      >
        <span className='button-text'>{this.props.text}</span>
      </button>
    );
  }
}

Button.defaultProps = {
  className: 'gray'
};
