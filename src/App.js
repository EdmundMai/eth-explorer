import React, { Component } from "react";
import { connect } from "react-redux";

import BackwardsForm from "./components/BackwardsForm";
import RangeForm from "./components/RangeForm";
import Stats from "./components/Stats";

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
    const {
      totalUncles,
      totalGasCostWei,
      totalReceivedWei,
      receivingAddresses,
      sendingAddresses,
      contractAddresses,
      fetchBlockRange,
    } = this.props;
    return (
      <div>
        <BackwardsForm
          onSubmit={blocksBackwards =>
            fetchBlockRange(
              this.state.latestBlockNumber - blocksBackwards,
              this.state.latestBlockNumber
            )
          }
        />
        <RangeForm
          max={this.state.latestBlockNumber}
          onSubmit={(start, end) => fetchBlockRange(start, end)}
        />
        <p>Latest Block Number: {this.state.latestBlockNumber}</p>
        <Stats
          transferredEther={EthereumApi.weiToEther(totalReceivedWei)}
          receivedEther={EthereumApi.weiToEther(totalReceivedWei)}
          sentEther={EthereumApi.weiToEther(
            totalReceivedWei.plus(totalGasCostWei)
          )}
          sendingAddresses={sendingAddresses}
          receivingAddresses={receivingAddresses}
          contractAddresses={contractAddresses}
          uncleCount={totalUncles}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  totalUncles: state.ethereum.totalUncles,
  totalGasCostWei: state.ethereum.totalGasCostWei,
  totalReceivedWei: state.ethereum.totalReceivedWei,
  receivingAddresses: state.ethereum.receivingAddresses,
  sendingAddresses: state.ethereum.sendingAddresses,
  contractAddresses: state.ethereum.contractAddresses,
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
