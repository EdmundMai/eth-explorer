import React, { Component } from "react";

export class BackwardsForm extends Component {
  state = {
    blocksBackwards: 0,
  };

  render() {
    const { onSubmit } = this.props;
    return (
      <div>
        <input
          type="number"
          step={1}
          min={0}
          value={this.state.blocksBackwards}
          onChange={e => this.setState({ blocksBackwards: e.target.value })}
        />
        <button onClick={() => onSubmit(this.state.blocksBackwards)}>
          Go backwards in time!
        </button>
      </div>
    );
  }
}

export default BackwardsForm;
