import React, { Component } from 'react';
import config from 'config.json';
import 'main/styles/app.css';

export default class GhostCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ghost: null,
    };
  }

  componentDidMount() {
    const { ghostId, bt, onClick } = this.props;
    if (ghostId) {
      this.getGhost(ghostId, bt, onClick)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ghostId !== this.props.ghostId || nextProps.bt !== this.props.bt) {
      this.getGhost(nextProps.ghostId, nextProps.bt, nextProps.onClick);
    }
  }

  getGhost = (ghostId, bt, onClick) =>  {
    fetch(`${config.apiRoot}/ghosts?bt=${bt}`)
      .then(res => res.blob())
      .then(blob => {
        const ghost = (
          <img
            src={URL.createObjectURL(blob)}
            alt="ghost body"
            data-ghostid={ghostId}
            onClick={onClick}
          />
        );
        this.setState({ ghost });
      });
  }

  render() {
    const { ghost } = this.state;
    return (
      <div>
        {ghost}
      </div>
    );
  }
}
