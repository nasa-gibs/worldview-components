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
import Dialog from '../modal/wv.dialog';

export default class DialogContent extends React.Component {
    constructor(props) {
      super(props)
      this.state = { isModalOpen: false }
    }

    openModal() {
      this.setState({ isModalOpen: true })
    }

    closeModal() {
      this.setState({ isModalOpen: false })
    }

    toggleModal() {
        if(this.state.isModalOpen) {
            this.closeModal()
        } else {
            this.openModal()
        }
    }

    render(){
      return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <input ref="inputText" />
          <input type="submit" />
          <button onClick = {this.props.closeDialog}>Cancel</button>
        </form>
      </div>
      )
    }

}
