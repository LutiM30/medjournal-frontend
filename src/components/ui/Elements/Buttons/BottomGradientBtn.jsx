import React from "react";
import BottomGradient from "../../Effects/BottomGradient";
import { FULL_WIDTH_BTN_HV_EFCT_CLASS } from "@/lib/constants.js";

const BottomGradientBtn = ({ label, className, onClick, type }) => (
  <button className={className} type={type} onClick={onClick}>
    {label}
    <BottomGradient />
  </button>
);

export default BottomGradientBtn;
