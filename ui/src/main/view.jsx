import React, { Component } from 'react';
import Web3 from 'web3';
import { actionValidator, accountValidator } from 'redux/validators';
import GhostCard from 'globals/containers/ghost-card';
import ItemWallet from 'globals/containers/item-wallet';
import config from 'config.json';
import CryptoGhosts from 'json/CryptoGhosts.json';
import { contractAddress } from 'json/contract-address.json';
import 'main/styles/app.css';

export default class App extends Component {
  static propTypes = {
    account: accountValidator,
    setAccount: actionValidator,
    setGhost: actionValidator,
  };
  constructor(props) {
    super(props);
    this.state = {
      ghostIds: [],
      requested: false,
    };
  }

  componentDidMount() {
    const provider = new Web3.providers.HttpProvider(config.blockchainRoot);
    const web3 = new Web3(provider);
    this.contract = new web3.eth.Contract(CryptoGhosts.abi, contractAddress);
    this.getGhosts(this.props.account);
    this.props.setGhost('');
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.account !== this.props.account) {
      this.getGhosts(nextProps.account);
    }
  }

  getGhosts = (account) => {
    this.contract.methods.ghostsOf(account).call({ from: account })
      .then(ghosts => {
        this.setState({ requested: true, ghostIds: ghosts[0].map(id => +id), });
      });
  }

  render() {
    const { ghostIds, requested } = this.state;
    const { account } = this.props;

    let view = null;
    if (requested) {
      view = "You have no ghosts!";
      if (ghostIds.length > 0) {
        view = ghostIds.map((t,i) =>
          <div key={t} className="col">
            <GhostCard ghostId={t} onClick={(e) => {
              this.props.setGhost(e.target.dataset.ghostid);
              this.props.history.push('/ghost');
            }} />
        </div>);
      }
    }
    return (
      <div>
        <div className="container app">
          <div className="row justify-content-center">
            <div className="col-6">
              <h1>Your Ghosts</h1>
            </div>
          </div>
          <div id="ghosts" className="row justify-content-center">
            {view}
          </div>
          <div className="row justify-content-center padded-row">
            <div className="col text-center">
              <ItemWallet account={account} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
