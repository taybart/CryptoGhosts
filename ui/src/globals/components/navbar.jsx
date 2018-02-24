import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { addresses } from 'json/keys.json';

export default class Navbar extends Component {
  render() {
    const { account } = this.props;
    return (<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        CryptoGhosts!
      </Link>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {account}
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {Object.keys(addresses).filter(a => a !== account).map(a => {
                    return (<button
                      key={`${a}`}
                      className={`dropdown-item`}
                      data-address={a}
                      onClick={(e) => this.props.setAccount(e.target.dataset.address)}
                    >
                      {a}
                    </button>
                    );
                })}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>);
  }
}
