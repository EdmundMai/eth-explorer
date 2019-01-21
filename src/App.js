import React, { Component } from "react";
import { connect } from "react-redux";

import ethereumActions from "./redux/actions/ethereum-actions";

import EthereumApi from "./services/ethereum-api";

export class App extends Component {
  state = {
    latestBlockNumber: undefined,
  };

  componentDidMount() {
    EthereumApi.getLatestBlockNumber().then(latestBlockNumber =>
      this.setState({ latestBlockNumber })
    );
  }

  render() {
    const { totalTransferredWei, fetchBlockRange } = this.props;
    return (
      <div>
        Latest Block Number: {this.state.latestBlockNumber}
        Total Transfer Value{" "}
        {EthereumApi.weiToEther(totalTransferredWei.toString())}
        <button
          onClick={() =>
            fetchBlockRange(
              this.state.latestBlockNumber - 2,
              this.state.latestBlockNumber
            )
          }>
          Fetch 2 blocks
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  totalTransferredWei: state.ethereum.totalTransferredWei,
});

const mapDispatchToProps = dispatch => ({
  fetchBlockRange: (startingBlockNumber, endingBlockNumber) =>
    dispatch(
      ethereumActions.fetchBlockRange(startingBlockNumber, endingBlockNumber)
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
