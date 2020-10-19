/*
   Health Meter
 */

import React from "react";
import PropTypes from "prop-types";
import { Note1Grey, SpaceBetween } from "common";
import { getHealthColor, getHealthLen } from "utils";

const HealthMeter = ({ healthScore }) => {
  const healthColor = getHealthColor(healthScore);
  const healthLen = getHealthLen(healthScore);

  const iconContainerStyle = {
    background: "#ffffff",
    borderColor: "#BDBDBD",
    borderRadius: 24,
    borderStyle: "solid",
    borderWidth: 0.8,
    height: 18,
    paddingRight: 10,
  };
  const healthStyle = {
    backgroundColor: healthColor,
    borderRadius: 24,
    height: 12,
    marginTop: 2,
    marginLeft: 2,
    width: healthLen,
  };
  const rateStyle = {
    color: healthColor,
    fontWeight: 700,
    textAlign: "center",
  };

  return (
    <div style={{ marginTop: 10 }}>
      <SpaceBetween>
        <Note1Grey>Health Meter</Note1Grey>
        <span style={rateStyle}>{healthScore}/5</span>
      </SpaceBetween>
      <div style={iconContainerStyle}>
        <div style={healthStyle} />
      </div>
    </div>
  );
};

HealthMeter.propTypes = {
  healthScore: PropTypes.number.isRequired,
};

export default HealthMeter;
