import React from 'react';
import Dragger from './wv-timeline-dragger.js';
import DraggerRange from './wv-timeline-draggerrange.js';


export default class TimelineRangeSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state =  {
      startLocation: props.startLocation,
      endLocation: props. endLocation
    };
  }
  render() {
    return(
      <g id="wv-timeline-range-selector" className="wv-timeline-range-selector">
        <Dragger
          position={this.state.startLocation}
          color={this.props.startColor}
          width={this.props.pinWidth}
          height={this.props.height} />
        <DraggerRange
          width={(this.state.endLocation - .5 * this.props.pinWidth) - (this.state.startLocation + .5 * this.props.pinWidth)}
          opacity={this.props.rangeOpacity}
          color={this.props.rangeColor}
          height={this.props.height} />
        <Dragger
          position={this.state.endLocation}
          color={this.props.endColor}
          width={this.props.pinWidth}
          height={this.props.height} />
      </g>
    );
  }

}