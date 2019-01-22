import React, { Component } from "react";
import styled from "styled-components";

import Button from "../shared/Button";
import NumberInput from "../shared/NumberInput";

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export class BackwardsForm extends Component {
  state = {
    blocksBackwards: 0,
  };

  render() {
    const { onSubmit } = this.props;

    const inputIsValid = this.state.blocksBackwards >= 0;

    return (
      <Container>
        <NumberInput
          type="number"
          step={1}
          min={0}
          value={this.state.blocksBackwards}
          onChange={e => this.setState({ blocksBackwards: e.target.value })}
        />
        <Button
          disabled={!inputIsValid}
          onClick={() => onSubmit(this.state.blocksBackwards)}>
          Go backwards in time!
        </Button>
      </Container>
    );
  }
}

export default BackwardsForm;
