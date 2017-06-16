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
import DialogContent from '../modal/wv.dialogcontent';

export default class Dialog extends React.Component {

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

  openDialog(e){
    e.preventDefault();

    var $dialog = $('<div>').dialog({
        dialogClass: "wv-panel wv-link-panel",
        title: "Copy this link to share:",
        show: { effect: "slide", direction: "up" },
        width: 300,
        height: "auto",
        minHeight: 10,
        draggable: false,
        resizable: false,
        // autoOpen: false,
      close: function(e){
        React.unmountComponentAtNode(this);
        $( this ).remove();
      }
    });
}

    closeDialog(e){
      e.preventDefault();
      $dialog.dialog('close');
    }

    // toggleDialog() {
    //     toggle(function() {
    //         $(this).openDialog();
    //     },function() {
    //         $(this).closeDialog();
    //     });
    // }

  render(){
    //   return (
    //       <DialogContent closeDialog={closeDialog} />, $dialog[0]
    //   )
    return(
        <button onClick= {this.openDialog}>Open Dialog</button>
    )
  }

}
