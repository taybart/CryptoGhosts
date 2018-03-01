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
    setItemLut: actionValidator,
  };
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      itemIds: [],
    };
  }

  componentDidMount() {
    const provider = new Web3.providers.HttpProvider(config.blockchainRoot);
    const web3 = new Web3(provider);
    this.contract = new web3.eth.Contract(CryptoGhosts.abi, contractAddress);

    const { account } = this.props;
    this.getItems(account)
      .then((types) => this.getItemLUT(types));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.account !== this.props.account) {
      this.getItems(nextProps.account)
        .then((types) => this.getItemLUT(types));
    }
  }

  equipItem = (id, type) => {
    const { equippedItems } = this.props;
    fetch(`${config.apiRoot}/item/equip`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ghostId: +this.props.selectedGhost,
        id,
        type,
      }),
    }).then(res => res.json())
      .then(json => {
        if (json.status === 'OK') {
          equippedItems.push({ id, type })
          this.props.setEquippedItems([ ...equippedItems ]);
        }
      });
  }

  getItemLUT = (itemIds) => {
    return new Promise(resolve => {
      fetch(`${config.apiRoot}/item/lut?items=${itemIds.join(',')}`).then(res => res.json())
        .then(json => {
          if (json.status === 'OK') {
            this.props.setItemLut(json.data);
            resolve(json.data);
          }
        });
    });
  }

  getItems = (account) => {
    return new Promise(resolve => {
      this.contract.methods.itemsOf(account).call()
        .then(items => {
          this.setState({ itemIds: items[0], items: items[1] });
          resolve(items[1]);
        });
    });
  }

  getEquippedItems = (ghostId) => {
    return new Promise(resolve => {
      fetch(`${config.apiRoot}/item/equipped?ghostId=${ghostId}`).then(res => res.json())
        .then(json => {
          this.setState({ items: json.data.items });
          resolve();
        });
    });
  }

  render() {
    const { items, itemIds } = this.state;
    const { selectedGhost, itemLut, equippedItems } = this.props;
    if (Object.keys(itemLut).length === 0) {
      return <div />
    }
    return (<div>
      <table className="table table-hover table-dark highlights">
        <thead>
          <tr>
            <th scope="col">Items</th>
            <th scope="col">Stat</th>
          </tr>
        </thead>
        <tbody>
          {itemIds.map((item, i) =>
            <tr key={i}>
              <td>{itemLut[items[i]].name}</td>
              <td>{itemLut[items[i]].stat}</td>
              {((selectedGhost === '') || !(equippedItems.every(ei => +ei.id !== +item)))?  null :
                  <td>
                    <button
                      type="button"
                      className="btn btn-secondary btn-block"
                      onClick={() => this.equipItem(item, items[i])}>
                      Equip
                    </button>
                  </td>}
                </tr>
          )}
        </tbody>
      </table>
    </div>);
  }
}
