import React, { Component } from 'react';
import Proptypes from 'prop-types';
import config from 'config.json';

export default class EquippedTable extends Component {
  static propTypes = {
    unequippable: Proptypes.bool,
    highlights: Proptypes.bool,
  };
  static defaultProps = {
    unequippable: true,
    highlights: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      equippedItems: [],
    };
  }

  componentDidMount() {
    const { noRedux, ghostId } = this.props;
    if (noRedux && ghostId) {
      this.getEquippedItems(ghostId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ghostId !== this.props.ghostId && nextProps.ghostId) {
      if (nextProps.noRedux) {
        this.getEquippedItems(nextProps.ghostId);
      }
    }
  }

  unequipItem = (id, type) => {
    fetch(`${config.apiRoot}/item/unequip`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ghostId: +this.props.selectedGhost,
        id,
        type,
      }),
    }).then(res => res.json())
      .then(json => {
        const { equippedItems } = this.props;
        let index = -1;
        equippedItems.forEach((it, i) => {
          if (+it.id === +id) { index = i; }
        });
        if (index > -1) {
          equippedItems.splice(index, 1)
          this.props.setEquippedItems([ ...equippedItems ]);
        }
      });
  }

  getEquippedItems = (ghostId) => {
    return new Promise(resolve => {
      fetch(`${config.apiRoot}/item/equipped?ghostId=${ghostId}`).then(res => res.json())
        .then(json => {
          this.setState({ equippedItems: json.data.items });
          resolve();
        });
    });
  }

  render() {
    const { noRedux, unequippable, equippedItems, itemLut, highlights } = this.props;
    let equipped = equippedItems;
    if (noRedux) {
      equipped = this.state.equippedItems;
    }

    let tableContents = (
      <tr>
        <td>
          None!
        </td>
      </tr>
    )
    if (equipped.length > 0) {
      tableContents = equipped.map((item, i) =>
        <tr key={`${i}-item`}>
          <td>{`${itemLut[item.type].name}`}</td>
          {unequippable ?
              <td>
                <button
                  type="button"
                  className="btn btn-secondary btn-block"
                  data-itemid={item.id}
                  data-type={item.type}
                  onClick={e => this.unequipItem(e.target.dataset.itemid, e.target.dataset.type)}
                >
                  Unequip
                </button>
              </td> : null}
            </tr>);
    }

    return (<table className={`table table-less-dark ${highlights ? 'highlights' : null}`}>
      <thead>
        <tr>
          <th scope="col" colSpan="2">Equipped Items</th>
        </tr>
      </thead>
      <tbody>
        {tableContents}
      </tbody>
    </table>);
  }
}
