import React, { Component } from "react";
import styled from "styled-components";

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  margin: 15px 0;
  display: flex;
`;

const Label = styled.div`
  display: flex;
  width: 200px;
  margin-right: 10px;
  font-weight: 600;
`;

const Value = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  align-items: flex-start;
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
        <Label>Total Transferred Value:</Label>
        <Value>{transferredEther} ETH</Value>
      </ListItem>
      <ListItem>
        <Label>Total Received Value:</Label>
        <Value>{receivedEther} ETH</Value>
      </ListItem>
      <ListItem>
        <Label>Total Sent Value:</Label>
        <Value>{sentEther} ETH</Value>
      </ListItem>
      <ListItem>
        <Label>Receiving Adresses:</Label>
        <Value>{receivingAddresses.join(", ")}</Value>
      </ListItem>
      <ListItem>
        <Label>Sending Adresses:</Label>
        <Value>{sendingAddresses.join(", ")}</Value>
      </ListItem>
      <ListItem>
        <Label>Contract Adresses:</Label>
        <Value>{contractAddresses.join(", ")}</Value>
      </ListItem>
      <ListItem>
        <Label>Total Number of Uncles:</Label>
        <Value>{uncleCount}</Value>
      </ListItem>
      <ListItem>
        <Label>Total Number of Unique Addresses that Sent Transactions:</Label>
        <Value>{sendingAddresses.length}</Value>
      </ListItem>
      <ListItem>
        <Label>
          Total Number of Unique Addresses that Received Transactions:
        </Label>
        <Value>{receivingAddresses.length}</Value>
      </ListItem>
    </List>
  </div>
);

export default Stats;
