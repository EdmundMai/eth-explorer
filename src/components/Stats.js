import React, { Component } from "react";

import styled from "styled-components";

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  margin: 10px 0;
`;

const Stats = ({
  transferredEther,
  receivedEther,
  sentEther,
  receivingAddresses,
  sendingAddresses,
  contractAddresses,
  uncleCount,
}) => (
  <div>
    <List>
      <ListItem>
        Total Transferred Value:
        {transferredEther} ETH
      </ListItem>
      <ListItem>
        Total Received Value:
        {receivedEther} ETH
      </ListItem>
      <ListItem>
        Total Sent Value:
        {sentEther} ETH
      </ListItem>
      <ListItem>
        Receiving Adresses:
        {receivingAddresses.join(", ")}
      </ListItem>
      <ListItem>
        Sending Adresses:
        {sendingAddresses.join(", ")}
      </ListItem>
      <ListItem>
        Contract Adresses:
        {contractAddresses.join(", ")}
      </ListItem>
      <ListItem>
        Total Number of Uncles:
        {uncleCount}
      </ListItem>
      <ListItem>
        Total Number of Unique Addresses that Sent Transactions:
        {sendingAddresses.length}
      </ListItem>
      <ListItem>
        Total Number of Unique Addresses that Received Transactions:
        {receivingAddresses.length}
      </ListItem>
    </List>
  </div>
);

export default Stats;
