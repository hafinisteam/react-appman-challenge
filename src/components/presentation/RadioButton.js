import React from "react";
import styled from "styled-components";

const RadioStyled = styled.input`
  position: absolute;
  opacity: 0;
  
  ~ label {
    color: ${props => props.color};
    font-family: Gaegu;
    font-weight: 700;
    font-size: 24px;
    cursor: pointer;
    position: relative;
    padding-left: 30px;
    margin-bottom: 12px;
    &:before,
    &:after {
      content: "";
      position: absolute;
      border-radius: 50%;
    }
    &:before {
      width: 22px;
      height: 22px;
      background: #eee;
      left: 0;
      top: 8px;
    }
    &:after {
      width: 14px;
      height: 14px;
      background: ${props => props.color};
      left: 4px;
      top: 12px;
      display: none;
    }

    &:hover {
      &:before {
        background: #ccc;
      }
    }
  }

  &:checked ~ label {
    &:after {
      display: block;
    }
  }
`;

const RadioButton = ({ color, label, name, forID, value, currentValue, onChange }) => {
  return (
    <div className="form-check form-check-inline">
      <RadioStyled
        color={color}
        className="form-check-input"
        type="radio"
        name={name}
        id={forID}
        value={value}
        onChange={onChange}
        checked={currentValue === value ? true : false}
      />
      <label className="form-check-label" htmlFor={forID}>
        {label}
      </label>
    </div>
  );
};

export default React.memo(RadioButton);
