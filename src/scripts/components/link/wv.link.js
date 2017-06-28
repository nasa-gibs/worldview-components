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
import Shortener from './wv.link.shortener';

export default class Link extends React.Component {

  constructor() {
    super();
    // this.functionOne = this.functionOne.bind(this);
    this.updateLinkState = this.updateLinkState.bind(this);
    this.clickFunction = this.clickFunction.bind(this);
    this.state = {
      fbLink: '',
      twLink: '',
      rdLink: '',
      emailLink: ''
    };
  }

  updateLinkState(fbLink, twLink, rdLink, emailLink, callback) {
    this.setState({
      fbLink : fbLink,
      twLink : twLink,
      rdLink : rdLink,
      emailLink : emailLink
    });
    console.log(this.state);
  }

  clickFunction() {
    // run the setLink function in WV to update the state
  }

  render() {
    return (
      <div>
        <Shortener on={this.props.urlShortener} />
        <ShareButtons
          fbLink={this.state.fbLink}
          twLink={this.state.twLink}
          rdLink={this.state.rdLink}
          emailLink={this.state.emailLink}
          onClick={this.clickFunction}
        />
      </div>
    );
  }

}
