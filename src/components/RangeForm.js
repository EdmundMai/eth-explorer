import React, { Component } from "react";

export class RangeForm extends Component {
  state = {
    start: "",
    end: "",
  };

  render() {
    const { max, onSubmit } = this.props;
    return (
      <div>
        <input
          type="number"
          step={1}
          min={0}
          max={max}
          value={this.state.start}
          onChange={e => this.setState({ start: e.target.value })}
        />
        <input
          type="number"
          step={1}
          min={0}
          max={max}
          value={this.state.end}
          onChange={e => this.setState({ end: e.target.value })}
        />
        <button
          disabled={!this.state.start.length || !this.state.end.length}
          onClick={() =>
            onSubmit(parseInt(this.state.start), parseInt(this.state.end))
          }>
          Search Range
        </button>
      </div>
    );
  }
}

export default RangeForm;
