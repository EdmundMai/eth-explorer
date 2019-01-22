import React, { Component } from "react";
import styled from "styled-components";

import Button from "../shared/Button";
import NumberInput from "../shared/NumberInput";
import Instructions from "../shared/Instructions";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

export class RangeForm extends Component {
  state = {
    start: "",
    end: "",
  };

  render() {
    const { max, onSubmit } = this.props;

    const inputIsValid =
      this.state.start.length &&
      this.state.end.length &&
      parseInt(this.state.end) <= max &&
      parseInt(this.state.start) <= parseInt(this.state.end);

    return (
      <Container>
        <Instructions>Stats from block #</Instructions>
        <NumberInput
          required
          step={1}
          min={0}
          max={max}
          value={this.state.start}
          onChange={e => this.setState({ start: e.target.value })}
        />
        <Instructions>to block #</Instructions>
        <NumberInput
          required
          step={1}
          min={0}
          max={max}
          value={this.state.end}
          onChange={e => this.setState({ end: e.target.value })}
        />
        <Button
          disabled={!inputIsValid}
          onClick={() =>
            onSubmit(parseInt(this.state.start), parseInt(this.state.end))
          }>
          Search Range
        </Button>
      </Container>
    );
  }
}

export default RangeForm;
