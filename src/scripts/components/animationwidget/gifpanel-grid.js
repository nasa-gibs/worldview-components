import React from 'react';
import PropTypes from 'prop-types';
/*
 * A table that updates with image
 * data
 *
 * @class ResolutionTable
 * @extends React.Component
 */
export class GifPanelGrid extends React.Component {
  renderImageSize() {
    var size = this.props.requestSize;
    if (!this.props.valid) {
      return (
        <div id='gif-size' className='gif-size gif-size-invalid grid-child'>
          <i className='fa fa-times fa-fw' />
          <span>{'~' + size + 'MB'}</span>
        </div>
      );
    } else {
      return (
        <div id='gif-size' className='gif-size grid-child'>
          <span>{'~' + size + ' MB'} </span>
        </div>
      );
    }
  }
  render() {
    let imageSize = this.renderImageSize();
    return (
      <div className='gif-download-grid'>
        <div className='grid-child'><span>Start Date: </span></div>
        <div className='grid-child'><span>{this.props.startDate} </span></div>
        <div className='grid-child'><span>End Date: </span></div>
        <div className='grid-child'><span>{this.props.endDate}</span></div>
        <div className='grid-child'><span>speed</span></div>
        <div className='grid-child'><span>{this.props.speed + ' Frames Per Second'}</span></div>
        <div className='grid-child'><span>Request Size</span></div>
        {imageSize}
        <div className='grid-child'><span>Max Request Size</span></div>
        <div className='grid-child gif-max-size'>
          <span>{this.props.maxGifSize + ' MB'}</span>
        </div>
        <div className='grid-child'><span>Image Dimensions</span></div>
        <div className='grid-child' id='wv-image-width'>
          <span>{this.props.width + ' x ' + this.props.height + 'px' }</span>
        </div>
      </div>
    );
  }
}
GifPanelGrid.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  maxGifSize: PropTypes.number,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  speed: PropTypes.number,
  valid: PropTypes.bool,
  requestSize: PropTypes.number,
  fileSizeEstimate: PropTypes.number
};
