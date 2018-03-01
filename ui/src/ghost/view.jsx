import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Web3 from 'web3';
import { actionValidator, accountValidator, selectedGhostValidator } from 'redux/validators';
import GhostCard from 'globals/containers/ghost-card';
import ItemWallet from 'globals/containers/item-wallet';
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
      this.getEquippedItems(selectedGhost)
        .then(this.getName(selectedGhost));
    }
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.selectedGhost !== this.props.selectedGhost) && (nextProps.selectedGhost !== '')) {
      this.getEquippedItems(nextProps.selectedGhost);
    }
  }

  getName = (ghostId) => {
    const { selectedGhost } = this.props;
    return new Promise(resolve => {
      fetch(`${config.apiRoot}/ghost/name?ghostId=${selectedGhost}`).then(res => res.json())
        .then(json => {
          let name = json.name;
          if (json.name === '') {
            name = 'Unknown';
          }
          this.setState({ name });
          resolve();
        });
    });
  }

  getEquippedItems = (ghostId) => {
    return new Promise(resolve => {
      fetch(`${config.apiRoot}/item/equipped?ghostId=${ghostId}`).then(res => res.json())
        .then(json => {
          this.props.setEquippedItems(json.data.items)
          resolve();
        });
    });
  }

  render() {
    const { selectedGhost, account } = this.props;

    if (selectedGhost === '') { return <Redirect to='/' />; }

    return (
      <div>
        <div className="back-button">
          <Link to="/" className="badge badge-secondary">
            {`< Back`}
          </Link>
        </div>
        <div className="container ghost">
          <div className="row">
            <div className="col-6 text-center">
              <GhostCard ghostId={selectedGhost} />
            </div>
            <div className="col-6 text-center">
              <ItemWallet account={account} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
