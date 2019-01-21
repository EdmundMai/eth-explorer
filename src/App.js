import React, { Component } from "react";
import { connect } from "react-redux";

import BackwardsForm from "./components/BackwardsForm";
import RangeForm from "./components/RangeForm";

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
        <ul>
          <li>Latest Block Number: {this.state.latestBlockNumber}</li>
          <li>
            Total Transferred Value:
            {EthereumApi.weiToEther(totalReceivedWei)} ETH
          </li>
          <li>
            Total Received Value:
            {EthereumApi.weiToEther(totalReceivedWei)} ETH
          </li>
          <li>
            Total Sent Value:
            {EthereumApi.weiToEther(totalReceivedWei.plus(totalGasCostWei))} ETH
          </li>
          <li>
            Receiving Adresses:
            {receivingAddresses.join(", ")}
          </li>
          <li>
            Sending Adresses:
            {sendingAddresses.join(", ")}
          </li>
          <li>
            Contract Adresses:
            {contractAddresses.join(", ")}
          </li>
          <li>
            Total Number of Uncles:
            {totalUncles}
          </li>
          <li>
            Total Number of Unique Addresses that Sent Transactions:
            {sendingAddresses.length}
          </li>
          <li>
            Total Number of Unique Addresses that Received Transactions:
            {receivingAddresses.length}
          </li>
        </ul>
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
