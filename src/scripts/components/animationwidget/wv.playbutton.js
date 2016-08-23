/*
 * NASA Worldview
 *
 * This code was originally developed at NASA/Goddard Space Flight Center for
 * the Earth Science Data and Information System (ESDIS) project.
 *
 * Copyright (C) 2013 - 2016 United States Government as represented by the
 * Administrator of the National Aeronautics and Space Administration.
 * All Rights Reserved.
 *
 * Licensed under the NASA Open Source Agreement, Version 1.3
 * http://opensource.gsfc.nasa.gov/nosa.php
 */

import React from 'react';

/*
 * A react component, Builds a rather specific
 * interactive widget
 *
 * @class AnimationWidget
 * @extends React.Component
 */
export default class PlayButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <a href="javascript:void(null)" title="Play video"
        className='wv-anim-play-case wv-icon-case'
        onClick={this.props.playing ? this.props.pause : this.props.play}
      >
        <i className={this.props.playing ? 'fa fa-pause wv-animation-widget-icon': 'fa fa-play wv-animation-widget-icon'} />
      </a>
    );
  }
}