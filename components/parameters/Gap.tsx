import React, { FC, useState } from 'react'
import { SetLocationValueDispatch } from '@uniformdev/mesh-sdk-react';
import { getGapTokens } from '../helpers/getTokensMap'
import ReactSlider from 'react-slider'

const options = getGapTokens()

type GapParamProps = {
  value?: string;
  setValue: SetLocationValueDispatch<string | undefined, string | undefined>;
};

export const GapParam: FC<GapParamProps> = ({ setValue, value }) => {
  const [currentGapValue, setCurrentGapValue] = useState<number>(() => {
    const savedIndex = options.findIndex(g => String(g.value) === String(value))

    return savedIndex > -1 ? savedIndex : 0
  })

  const handleValueChange = (value: string) => {
    setValue(() => ({ newValue: value }));
  };

  const handleGapValueChange = (index: number) => {
    setCurrentGapValue(index)
    handleValueChange(options[index].value)
  }

  return (
    <div className="slider-style-container">
      <ReactSlider
        className="horizontal-slider"
        thumbClassName="slider-thumb"
        min={0}
        max={options.length ? options.length - 1 : 0}
        onChange={handleGapValueChange}
        step={1}
        value={currentGapValue}
      />
      <div
        className="slider-thumb-value">{`${options?.[currentGapValue].label}`}</div>
    </div>
  );
};
