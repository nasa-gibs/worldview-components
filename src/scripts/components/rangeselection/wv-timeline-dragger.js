import React from 'react';
import Draggable from 'react-draggable';

export default class TimelineDragger extends React.Component {
  constructor(props) {
    super(props);
    this.state =  {
      position: this.props.position
    };
  }
  render() {
    return(
      <Draggable
        axis="x"
        >
          <rect
              x={this.state.position}
              width={this.props.width}
              height={this.props.height}
              style={{fill:this.props.color}}/>
      </Draggable>
    );
  }

}