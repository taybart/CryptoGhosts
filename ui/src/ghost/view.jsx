import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Web3 from 'web3';
import { actionValidator, accountValidator, selectedGhostValidator } from 'redux/validators';
import GhostCard from 'globals/components/ghost-card';
import config from 'config.json';
import CryptoGhosts from 'json/CryptoGhosts.json';
import { contractAddress } from 'json/contract-address.json';
import 'ghost/styles/ghost.css';

export default class Ghost extends Component {
  static propTypes = {
    account: accountValidator,
    selectedGhost: selectedGhostValidator,
    setAccount: actionValidator,
  };
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      itemLabels: ['Head', 'Chest', 'Face', 'Left Hand', 'Right Hand'],
      name: '',
      bodyType: 0,
    };
  }

  componentDidMount() {
    const provider = new Web3.providers.HttpProvider(config.blockchainRoot);
    const web3 = new Web3(provider);
    this.contract = new web3.eth.Contract(CryptoGhosts.abi, contractAddress);

    const { selectedGhost } = this.props;
    if (selectedGhost !== '') {
      this.getItemLUT()
        .then(this.getName(selectedGhost))
        .then(this.getBodyType(selectedGhost))
        .then(this.getItems(selectedGhost));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedGhost !== this.props.selectedGhost) {
      this.getItems(nextProps.selectedGhost);
    }
  }

  getItemLUT = () => {
    return new Promise(resolve => {
      fetch(`${config.apiRoot}/item-lut`).then(res => res.json())
        .then(json => {
          if (json.status === 'OK') {
            this.setState({ itemLut: json.data });
            resolve();
          }
        });
    });
  }

  getName = (ghostId) => {
    return new Promise(resolve => {
      this.contract.methods.getGhostName(ghostId).call()
        .then(n => {
          let name = n;
          if (n === '') {
            name = 'Unknown';
          }
          this.setState({ name });
          resolve();
        });
    });
  }

  getBodyType = (ghostId) => {
    return new Promise(resolve => {
      this.contract.methods.getBodyType(ghostId).call()
        .then(bodyType => {
          this.setState({ bodyType });
          resolve();
        });
    });
  }

  getItems = (ghostId) => {
    return new Promise(resolve => {
      this.contract.methods.getEquippedItems(ghostId).call()
        .then(items => {
          this.setState({ items: Object.keys(items).map(i => items[i]) });
          resolve();
        });
    });
  }

  render() {
    const { items, itemLabels, itemLut, name, bodyType } = this.state;
    const { selectedGhost } = this.props;
    if (selectedGhost === '') {
      return <Redirect to='/' />;
    }
    return (
      <div>
        <div className="container ghost">
          <div className="row">
            <div className="col-6 text-center">
              <GhostCard ghostId={selectedGhost} bt={bodyType} />
            </div>
            <div className="col-6">
              <ul className="list-group dark-text">
                  <li className="list-group-item">
                    {`Name: ${name}`}
                  </li>)}
                {items.map((item, i) =>
                  <li key={`${i}-item`} className="list-group-item">
                    {`${itemLabels[i]}: ${itemLut[item]}`}
                  </li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
    );
  }
}


