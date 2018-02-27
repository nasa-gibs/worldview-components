/*
 * NASA Worldview
 *
 * This code was originally developed at NASA/Goddard Space Flight Center for
 * the Earth Science Data and Information System (ESDIS) project.
 *
 * Copyright (C) 2013 - 2017 United States Government as represented by the
 * Administrator of the National Aeronautics and Space Administration.
 * All Rights Reserved.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Button from '../main/button';

/*
 * A table that updates with image
 * data
 *
 * @class ResolutionTable
 * @extends React.Component
 */
export default class ResolutionTable extends React.Component {
  renderImageSize() {
    var size = this.props.fileSize;
    if (!this.props.valid) {
      return (
        <div id='wv-image-size' className='wv-image-size wv-image-size-invalid grid-child'>
          <i className='fa fa-times fa-fw' />
          <span>{'~' + size + 'MB'}</span>
        </div>
      );
    } else {
      return (
        <div id='wv-image-size' className='wv-image-size grid-child'>
          <span>{'~' + size + ' MB'} </span>
        </div>
      );
    }
  }
  render() {
    let imageSize = this.renderImageSize();
    return (
      <div className='wv-image-download-grid'>
        <div className='grid-child grid-head'><span>Raw Size</span></div>
        <div className='grid-child grid-head'><span>Maximum</span></div>
        <div className='grid-child'><span>{imageSize}</span></div>
        <div className='grid-child wv-image-max-size'>
          <span>{this.props.maxImageSize }</span>
        </div>
        <div className='grid-child wv-image-dimensions' id='wv-image-dimensions'>
          <span>{this.props.width + ' x ' + this.props.height + 'px' }</span>
        </div>
        <div className='grid-child wv-image-button'>
          <Button
            className='black'
            text='Download'
            onClick={this.props.onClick}
            valid={this.props.valid}
          />
        </div>
      </div>
    );
  }
}
ResolutionTable.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  valid: PropTypes.bool,
  onClick: PropTypes.func,
  fileSize: PropTypes.string,
  maxImageSize: PropTypes.string
};
