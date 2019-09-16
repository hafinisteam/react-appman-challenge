import React, { useState } from "react";
import { COLORS_TYPE } from "../../colors";
import RadioButton from "./RadioButton";

const SearchType = ({ onChangeRadio }) => {
  const types = Object.keys(COLORS_TYPE);
  const [type, setType] = useState("");

  function handleChange(ev) {
    setType(ev.target.value);
    onChangeRadio(ev);
  }
  return (
    <div>
      {types.map(t => (
        <RadioButton
          key={COLORS_TYPE[t]}
          color={COLORS_TYPE[t]}
          label={t}
          name='type'
          forID={t}
          value={t}
          currentValue={type}
          onChange={handleChange}
        />
      ))}
    </div>
  );
};

export default React.memo(SearchType);
