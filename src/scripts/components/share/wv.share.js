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
import Modal from '../modal/wv.modal';

/*
 * A react component, Builds a rather specific
 * interactive widget
 *
 * @class AnimationWidget
 * @extends React.Component
 */
export default class Share extends React.Component {
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

    render() {
      return (
        <div className="wv-share-modal">
          <button className="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" onClick={() => this.toggleModal()}>
            <span className="ui-button-text">
              <i className="fa fa-share-square-o fa-2x"></i>
            </span>
          </button>
          <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
            <h1>Modal title</h1>
            <p>hello</p>
            <p><button onClick={() => this.closeModal()}>Close</button></p>
          </Modal>
        </div>
      )
    }

  // render() {
  //   return(
  //     <div className="wv-share-modal">
  //       <label for="wv-link-button-check" title="Share this map" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button">
  //         <span class="ui-button-text">
  //             <i class="fa fa-share-square-o fa-2x"></i>
  //         </span>
  //       </label>
  //       <input type="checkbox" id="wv-link-button-check" class="ui-helper-hidden-accessible" />
  //     </div>
  //   );
  // }
}
