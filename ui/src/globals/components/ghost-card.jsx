import React, { Component } from 'react';
import Web3 from 'web3';
import { Link } from 'react-router-dom';
import { Modal, ModalButton } from 'globals/components/ghost-modal';
import EquippedTable from 'globals/containers/equipped-table';
import config from 'config.json';
import CryptoGhosts from 'json/CryptoGhosts.json';
import { contractAddress } from 'json/contract-address.json';

export default class GhostCard extends Component {
  static propTypes = {
  };
  static defaultProps = {
    notOwned: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      ghost: null,
      name: '',
      newName: '',
      stat: 'N/A',
      bodyUrls: {},
    };
  }

  componentDidMount() {
    const { ghostId, onClick } = this.props;
    const provider = new Web3.providers.HttpProvider(config.blockchainRoot);
    const web3 = new Web3(provider);
    this.contract = new web3.eth.Contract(CryptoGhosts.abi, contractAddress);

    if (ghostId) {
      this.getName(ghostId)
        .then(() => this.getStat(ghostId))
        .then(() => this.getBody(ghostId, onClick));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ghostId !== this.props.ghostId || nextProps.bt !== this.props.bt) {
      this.getName(nextProps.ghostId)
        .then(() => this.getStat(nextProps.ghostId))
        .then(() => this.getBody(nextProps.ghostId,
          nextProps.bt, nextProps.onClick));

    }
    if (nextProps.equippedItems !== this.props.equippedItems) {
      this.getStat(nextProps.ghostId)
    }
  }

  getStat = (ghostId) => {
    return new Promise(resolve => {
      fetch(`${config.apiRoot}/ghost/stats?ghostId=${ghostId}`).then(res => res.json())
        .then(json => {
          if (json.status === 'OK') {
            this.setState({ stat: json.data.stat })
          }
          resolve();
        })
    });
  }

  setName = () => {
    const { newName } = this.state;
    const { selectedGhost } = this.props;
    return new Promise(resolve => {
      fetch(`${config.apiRoot}/ghost/name`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({
          ghostId: +selectedGhost,
          name: newName,
        }),
      }).then(res => res.json())
        .then(json => {
          this.setState({ name: newName });
          resolve(newName);
        });
    });
  }

  getName = (ghostId) => {
    return new Promise(resolve => {
      fetch(`${config.apiRoot}/ghost/name?ghostId=${ghostId}`).then(res => res.json())
        .then(json => {
          let name = json.data.name;
          if (!json.data.name) {
            name = 'No name';
          }
          this.setState({ name });
          resolve(name);
        });
    });
  }

  getBody = (ghostId, onClick) =>  {
    const { bodyImgUrls } = this.props;
    return new Promise(resolve => {
      this.contract.methods.typeOf(ghostId).call()
        .then(bt => {
          if (bodyImgUrls[bt]) {
            const ghostImg = (<img
              className="card-img-top ml-auto mr-auto"
              style={{ width:'200px', height: '200px' }}
              data-ghostid={ghostId} onClick={onClick}
              src={bodyImgUrls[bt]} alt="ghost body"
            />);
            this.setState({ ghostImg });
          } else {
            fetch(`${config.apiRoot}/ghost/img?bt=${bt}`)
              .then(res => res.blob())
              .then(blob => {
                const blobUrl = URL.createObjectURL(blob);
                const ghostImg = (<img
                  className="card-img-top ml-auto mr-auto"
                  style={{ width:'200px', height: '200px' }}
                  data-ghostid={ghostId} onClick={onClick}
                  src={blobUrl} alt="ghost body"
                />);
                const bU = { ...bodyImgUrls, [bt]: blobUrl };
                this.props.setBodyImgUrls(bU);
                this.setState({ ghostImg });
                resolve();
              });
          }
        });
    });
  }


  render() {
    const { stat, name, newName, ghostImg } = this.state;
    const { ghostId, selectedGhost, unequippable, notOwned } = this.props;
    return (<div>
      <Modal id={ghostId} title={`Rename ${name}`}>
        <div className="modal-body">
          <form id="rename-ghost-form" onSubmit={(e) => {
            e.preventDefault();
            this.setName(e.target.value).then(() =>
              window.$(`#ghost-modal-${ghostId}`).modal('hide'));
          }}>
          <div className="form-group row">
            {/* <label htmlFor="ghost-name-input" className="col-2 col-form-label"> Name:</label> */}
            <div className="col-10">
              <input
                id='ghost-name-input'
                type="text"
                className="form-control"
                placeholder={newName}
                onChange={(e) => this.setState({newName: e.target.value})}
              />
            </div>
          </div>
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-danger" data-dismiss="modal">Cancel</button>
        <button type="submit" form="rename-ghost-form" className="btn btn-primary">
          Rename
        </button>
      </div>
    </Modal>
    <div className="card ghost-card">
      {ghostImg}
      <div className="card-body">
        <div className="row">
          <div className="col">
            <h5 className="card-title">
              <div>{name}</div>
              <div>Level: {stat}</div>
            </h5>
          </div>
          {(selectedGhost === '') ? null :
              <div className="col">
                <ModalButton id={ghostId}>
                  Rename
                </ModalButton>
              </div>
          }
          {(selectedGhost === '') ? null :
              <div className="col">
                <Link to="/battle" className="btn btn-secondary btn-block">
                  Battle
                </Link>
              </div>
          }
        </div>
        {(selectedGhost === '') ? null :
            <div className="row">
              <div className="col">
                <EquippedTable ghostId={ghostId} unequippable={unequippable} noRedux={notOwned} />
              </div>
            </div>
        }
      </div>
    </div>
  </div>);
  }
}
