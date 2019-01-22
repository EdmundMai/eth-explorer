import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 50px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  margin: 15px 0;
`;

const Label = styled.div`
  display: flex;
  font-weight: 600;
  margin-right: 10px;
  width: 300px;
`;

const Value = styled.div`
  align-items: flex-start;
  display: flex;
  flex: 1;
  justify-content: flex-start;
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
  <Container>
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
  </Container>
);

export default Stats;
