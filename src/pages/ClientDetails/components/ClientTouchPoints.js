/*
   Client Touch Points
 */

import React from "react";
import { SubH2, Text, Note1Grey, Flex } from "common";
import { iconMail } from "media/svg";

const ClientTouchPoints = ({ name, note }) => {
  const renderPoint = (
    <div style={{ paddingBottom: 22 }}>
      <Flex>
        <img src={iconMail} alt="" />
        <Note1Grey style={{ paddingRight: 8, paddingLeft: 8 }}>
          3/19/20 1:34 PM by{" "}
        </Note1Grey>
        <span style={{ color: "#115CE5" }}>{name}</span>
      </Flex>
      <Text>
        Lorem ipsum dolor sit amet, consect s acing elit, sed dos eat oaset
        read.
      </Text>
    </div>
  );
  return (
    <div>
      <SubH2>Latest Touch Points</SubH2>
      {renderPoint}
      {renderPoint}
    </div>
  );
};

export default ClientTouchPoints;
