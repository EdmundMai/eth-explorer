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
    const {
      totalGasWei,
      totalSentWei,
      totalReceivedWei,
      receivingAddresses,
      sendingAddresses,
      fetchBlockRange,
    } = this.props;
    return (
      <div>
        <ul>
          <li>Latest Block Number: {this.state.latestBlockNumber}</li>
          <li>
            Total Sent Value:
            {EthereumApi.weiToEther(totalSentWei)} ETH
          </li>
          <li>
            Total Received Value:
            {EthereumApi.weiToEther(totalReceivedWei)} ETH
          </li>
          <li>
            Total Transferred Value:
            {EthereumApi.weiToEther(totalSentWei - totalGasWei)} ETH
          </li>
          <li>
            Receiving Adresses:
            {receivingAddresses.join(", ")}
          </li>
          <li>
            Sending Adresses:
            {sendingAddresses.join(", ")}
          </li>
        </ul>
        <button
          onClick={() =>
            fetchBlockRange(
              this.state.latestBlockNumber - 1,
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
  totalGasWei: state.ethereum.totalGasWei,
  totalSentWei: state.ethereum.totalSentWei,
  totalReceivedWei: state.ethereum.totalReceivedWei,
  receivingAddresses: state.ethereum.receivingAddresses,
  sendingAddresses: state.ethereum.sendingAddresses,
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
