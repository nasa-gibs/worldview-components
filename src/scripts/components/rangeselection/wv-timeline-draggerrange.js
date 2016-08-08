import React from 'react';

export default class TimelineDraggerRange extends React.Component {
  constructor(props) {
    super(props);
    this.state =  {
      position: this.props.position
    };
  }
  render() {
    var styles = {
      fillOpacity: this.props.opacity
    };
    return (
      <rect
        fill={this.props.color}
        width={this.props.width}
        x={this.props.position}
        style={styles}
        height={this.props.height}  />
    );
  }

}