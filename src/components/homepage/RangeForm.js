import React, { Component } from "react";
import styled from "styled-components";

import Button from "../shared/Button";
import NumberInput from "../shared/NumberInput";

const Container = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
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
        <NumberInput
          required
          step={1}
          min={0}
          max={max}
          value={this.state.start}
          onChange={e => this.setState({ start: e.target.value })}
        />
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
