import React from 'react';
/*
 * A scrollable list of layers
 * @class LayerList
 * @extends React.Component
 */
export class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked
    };
  }

  handleChange(e) {
    this.setState({
      checked: !this.state.checked
    });
    console.log(this.state.checked, e);
  }
  render() {
    return (
      <div className='checkbox'>
        <input
          type="checkbox"
          id={this.props.id}
          title={this.props.title}
          name={this.props.name}
          checked={this.state.checked}
          className={this.props.classNames}
          onChange={this.handleChange.bind(this)}
        />
        <label htmlFor={this.props.id}>
          {this.props.label}
        </label>
      </div>
    );
  }
};
Checkbox.defaultProps = {
  checked: true
};
