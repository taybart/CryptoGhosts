import React, { Component } from 'react';
import Web3 from 'web3';
import { actionValidator, accountValidator, selectedGhostValidator } from 'redux/validators';
import config from 'config.json';
import CryptoGhosts from 'json/CryptoGhosts.json';
import { contractAddress } from 'json/contract-address.json';
import 'ghost/styles/ghost.css';

export default class ItemWallet extends Component {
  static propTypes = {
    account: accountValidator,
    selectedGhost: selectedGhostValidator,
    setAccount: actionValidator,
  };
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      itemIds: [],
      name: '',
    };
  }

  componentDidMount() {
    const provider = new Web3.providers.HttpProvider(config.blockchainRoot);
    const web3 = new Web3(provider);
    this.contract = new web3.eth.Contract(CryptoGhosts.abi, contractAddress);

    const { account } = this.props;
    this.getItemLUT()
      .then(this.getItemIds(account))
      .then(this.getItems(account));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.account !== this.props.account) {
      this.getItemIds(nextProps.account)
      .then(this.getItems(nextProps.account));
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

  getItemIds = (account) => {
    return new Promise(resolve => {
      this.contract.methods.itemsOf(account).call()
        .then(items => {
          this.setState({ itemIds: Object.keys(items).map(i => items[i]) });
          resolve();
        });
    });
  }

  getItems = (account) => {
    return new Promise(resolve => {
      this.contract.methods.itemTypesOf(account).call()
        .then(items => {
          this.setState({ items: Object.keys(items).map(i => items[i]) });
          resolve();
        });
    });
  }

  render() {
    const { items, itemIds, itemLut } = this.state;
    return (
      <table className="table table-hover table-dark">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {itemIds.map((item, i) =>
            <tr key={i}>
              <td>{item}</td>
              <td>{itemLut[items[i]]}</td>
              <td><button className="btn btn-secondary btn-block">Transfer</button></td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}
