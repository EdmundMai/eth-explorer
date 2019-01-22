import React, { Component } from "react";
import styled from "styled-components";

import Button from "../shared/Button";
import NumberInput from "../shared/NumberInput";

const Container = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
`;

export class BackwardsForm extends Component {
  state = {
    blocksBackwards: 0,
  };

  render() {
    const { onSubmit } = this.props;
    return (
      <Container>
        <NumberInput
          type="number"
          step={1}
          min={0}
          value={this.state.blocksBackwards}
          onChange={e => this.setState({ blocksBackwards: e.target.value })}
        />
        <Button onClick={() => onSubmit(this.state.blocksBackwards)}>
          Go backwards in time!
        </Button>
      </Container>
    );
  }
}

export default BackwardsForm;
