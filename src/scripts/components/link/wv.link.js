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
import ShareButtons from './wv.link.share';

export default class Link extends React.Component {

  constructor(props) {
    super(props);
    this.updateLinkState = this.updateLinkState.bind(this);
    this.state = {
      fbLink: '#',
      twLink: '#',
      rdLink: '#',
      emailLink: '#'
    };
  }

  updateLinkState(fbLink, twLink, rdLink, emailLink, callback) {
    this.setState({
      fbLink : fbLink,
      twLink : twLink,
      rdLink : rdLink,
      emailLink : emailLink
    });
  }

  render() {
    return (
      <div>
        <ShareButtons
          fbLink={this.state.fbLink}
          twLink={this.state.twLink}
          rdLink={this.state.rdLink}
          emailLink={this.state.emailLink}
          onClick={this.props.clickFunction}
        />
      </div>
    );
  }

}
