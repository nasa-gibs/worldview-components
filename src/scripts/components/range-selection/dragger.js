import React from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';

/*
 * A react component, is a draggable svg
 * group
 *
 * @class TimelineDragger
 * @extends React.Component
 */
class TimelineDragger extends React.Component {
  /*
   * @constructor
   */
  checkVisibility() {
    var visibility = 'visible';
    if (this.props.position < 0 || this.props.position > this.props.max) {
      visibility = 'hidden';
    }
    this.state = {
      visibility: visibility
    };
  }
  /*
   * When the component is dragged,
   * this function passes the id
   * and change-in-x of the drag
   * to onDrag callback
   *
   * @method handleDrag
   *
   * @return {void}
   */
  handleDrag(e, d) {
    e.stopPropagation();
    this.props.onDrag(d.deltaX, this.props.id);
  }

  /*
   * @method render
   */
  render() {
    this.checkVisibility();
    return (
      <Draggable
        onDrag={this.handleDrag.bind(this)}
        position={{x: this.props.position, y: 0}}
        onStop={this.props.onStop}
        axis="x"
      >
        <g>
          <rect
            width={this.props.width}
            height={this.props.height}
            style={{
              fill: this.props.color,
              visibility: this.state.visibility
            }}
          />
          {
            /*
             * this polygon element builds a triangle
             * based on the width and height of the
             * rectangle element
             */
          }
          <polygon
            points={'0,0,' + this.props.height / 1.5 + ',0 ' + this.props.height / 3 + ', ' + this.props.height / 1.5 }
            transform={'translate(' + (-(this.props.width * 2.45)) + ', ' + (-(this.props.height / 2)) + ')'}
            id={this.props.draggerID}
            style={{
              fill: this.props.triangleColor,
              visibility: this.state.visibility,
              stroke: '#000',
              cursor: 'pointer'
            }}
          />
        </g>
      </Draggable>
    );
  }
}
TimelineDragger.defaultProps = {
  visible: true
};

TimelineDragger.propTypes = {
  opacity: PropTypes.number,
  startLocation: PropTypes.number,
  endLocation: PropTypes.number,
  max: PropTypes.number,
  height: PropTypes.number,
  onDrag: PropTypes.func,
  onClick: PropTypes.func,
  color: PropTypes.string,
  position: PropTypes.number,
  id: PropTypes.string,
  onStop: PropTypes.func,
  width: PropTypes.number,
  triangleColor: PropTypes.string,
  draggerID: PropTypes.string
};

export default TimelineDragger;
