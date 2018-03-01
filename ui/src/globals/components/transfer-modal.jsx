import React, { Component } from 'react';

export class TransferModal extends Component {
  render() {
    const {id, name} = this.props;
    return (
      <div className="modal fade modal-dark" key={id} id={`transfer-modal-${id}`} tabIndex="-1" role="dialog" aria-labelledby={`transfer-modal-${id}`} aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`modal-${id}-label`}>Start Transfer for {name}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group row">
                  <label htmlFor="transfer-account" className="col-2 col-form-label"> Account: </label>
                  <div className="col-10">
                    <input id="transfer-account" type="text" className="form-control" placeholder="ETH Address" />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="transfer-account" className="col-2 col-form-label"> Price:</label>
                  <div className="col-10">
                    <input id="transfer-account" type="text" className="form-control" placeholder="0.01" />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary">Transfer</button>
            </div>
          </div>
        </div>
      </div>);
  }
}

export class TransferButton extends Component {
  render() {
    return (<button
      type="button"
      data-toggle="modal"
      data-target={`#transfer-modal-${this.props.id}`}
      className="btn btn-secondary btn-block"
    >
      {this.props.children}
    </button>);
  }
}
