import React, { Component } from 'react';

export class Modal extends Component {
  render() {
    const { id } = this.props;
    return (
      <div className="modal fade modal-dark" key={id} id={`ghost-modal-${id}`} tabIndex="-1" role="dialog" aria-labelledby={`transfer-modal-${id}`} aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`modal-${id}-label`}>{this.props.title}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            {this.props.children}
          </div>
        </div>
      </div>);
  }
}

export class ModalButton extends Component {
  render() {
    return (<button
      type="button"
      data-toggle="modal"
      data-target={`#ghost-modal-${this.props.id}`}
      className="btn btn-secondary btn-block"
    >
      {this.props.children}
    </button>);
  }
}
