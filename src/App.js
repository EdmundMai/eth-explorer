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
      totalUncles,
      totalGasWei,
      totalSentWei,
      totalReceivedWei,
      receivingAddresses,
      sendingAddresses,
      contractAddresses,
      fetchBlockRange,
    } = this.props;
    return (
      <div>
        <ul>
          <li>Latest Block Number: {this.state.latestBlockNumber}</li>
          <li>
            Total Transferred Value:
            {EthereumApi.weiToEther(totalSentWei)} ETH
          </li>
          <li>
            Total Received Value:
            {EthereumApi.weiToEther(totalReceivedWei)} ETH
          </li>
          <li>
            Total Sent Value:
            {EthereumApi.weiToEther(totalSentWei + totalGasWei)} ETH
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
            Total Number of Unique Transactions that Sent Transactions:
            {sendingAddresses.length}
          </li>
          <li>
            Total Number of Unique Transactions that Received Transactions:
            {receivingAddresses.length}
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
  totalUncles: state.ethereum.totalUncles,
  totalGasWei: state.ethereum.totalGasWei,
  totalSentWei: state.ethereum.totalSentWei,
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
