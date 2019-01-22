import React, { Component } from "react";
import { connect } from "react-redux";

import BackwardsForm from "./BackwardsForm";
import RangeForm from "./RangeForm";
import Stats from "./Stats";
import Header from "./Header";
import Caption from "./Caption";

import ethereumActions from "../../redux/actions/ethereum-actions";

import EthereumApi from "../../services/ethereum-api";

export class Homepage extends Component {
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
      totalContractsCreated,
      totalGasCostWei,
      totalReceivedWei,
      receivingAddresses,
      sendingAddresses,
      contractAddresses,
      fetchBlockRange,
    } = this.props;
    return (
      <div>
        <Header>Edmund's Eth Explorer</Header>
        <BackwardsForm
          onSubmit={blocksBackwards =>
            fetchBlockRange(
              this.state.latestBlockNumber - blocksBackwards,
              this.state.latestBlockNumber
            )
          }
        />
        <Caption>OR</Caption>
        <RangeForm
          max={this.state.latestBlockNumber}
          onSubmit={(start, end) => fetchBlockRange(start, end)}
        />
        <Caption>Current Block Number: {this.state.latestBlockNumber}</Caption>
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
          contractsCreatedCount={totalContractsCreated}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  totalUncles: state.ethereum.totalUncles,
  totalContractsCreated: state.ethereum.totalContractsCreated,
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
)(Homepage);
