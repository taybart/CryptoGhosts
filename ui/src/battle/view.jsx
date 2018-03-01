import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Web3 from 'web3';
import io from 'socket.io-client';
import { actionValidator, accountValidator, selectedGhostValidator } from 'redux/validators';
import GhostCard from 'globals/containers/ghost-card';
import config from 'config.json';
import CryptoGhosts from 'json/CryptoGhosts.json';
import { contractAddress } from 'json/contract-address.json';
import person from 'battle/img/person.png';
import 'battle/styles/battle.css';

export default class Battle extends Component {
  static propTypes = {
    account: accountValidator,
    selectedGhost: selectedGhostValidator,
    setAccount: actionValidator,
  };

  constructor(props) {
    super(props);
    this.state = {
      registered: false,
      accepted: false,
      opponentId: null,
      winner: null,
    };
  }

  componentDidMount() {
    const { selectedGhost } = this.props;

    const provider = new Web3.providers.HttpProvider(config.blockchainRoot);
    const web3 = new Web3(provider);
    this.contract = new web3.eth.Contract(CryptoGhosts.abi, contractAddress);
    this.socket = io(config.apiRoot);
    this.socket.on('battle', (data) => {
      const opponentId = (data.ghostIds.filter(g => g !== +this.props.selectedGhost ))[0];
      const winner = (data.winner === +selectedGhost);
      console.log(winner, data);
      this.setState({accepted: true, opponentId, winner });
    });
    if (selectedGhost !== '') {
      this.getStat();
    }

  }
  componentWillUnmount() {
    this.socket.close();
  }

  getStat = () => {
    const { selectedGhost } = this.props;
    return new Promise(resolve => {
      fetch(`${config.apiRoot}/ghost/stats?ghostId=${selectedGhost}`).then(res => res.json())
        .then(json => {
          if (json.status === 'OK') {
            this.setState({ stat: json.data.stat })
          }
          resolve();
        })
    });
  }
  registerForBattle = () => {
    const { stat } = this.state;
    const { selectedGhost } = this.props;
    return new Promise(resolve => {
      fetch(`${config.apiRoot}/battle/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ghostId: +selectedGhost,
          stat
        }),
      }).then(res => res.json())
        .then(json => {
          if (json.status === 'OK') {
            console.log(json);
            this.socket.emit('join-arena', json.data.arenaId);
            this.setState({ registered: true })
          }
        });
    });
  }

  render() {
    const { registered, accepted, opponentId, winner } = this.state;
    const { selectedGhost } = this.props;

    if (selectedGhost === '') { return <Redirect to='/' />; }

    const registration = ((registered) ?
      <h3>Finding opponent...</h3> :
      <button
        type="button"
        className="btn btn-secondary "
        onClick={() => this.registerForBattle()}
      >
        Find Opponent
      </button>);

    const view = ((accepted) ? <GhostCard ghostId={opponentId} unequippable={false} notOwned />
      : registration)
    return (<div>
      <div className="back-button">
        <Link to="/ghost" className="badge badge-secondary">
          {`< Back`}
        </Link>
      </div>
      {/* BATTLE ANIMATIONS */}
      {opponentId ?
      <div className={`battle-person scared-${winner ? 'win' :'loss'}`}>
        <img src={person} className="walk" alt="person" />
      </div> : null}
      {/* BATTLE ANIMATIONS */}
      <div className="container battle">
        <div className="row">
        </div>
        <div className="row">
          <div className="col-6 text-center">
            <GhostCard ghostId={selectedGhost} unequippable={false} />
          </div>
          <div className="col-6">
            {view}
          </div>
        </div>
      </div>
    </div>);
  }
}
