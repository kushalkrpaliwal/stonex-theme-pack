import React, { FC, useState } from 'react';
import { SetLocationValueDispatch } from '@uniformdev/mesh-sdk-react';
import ReactSlider from 'react-slider';
import { tokens } from '../../tokens/tokens'

type Option = {
  value: string;
  label: string;
};

const options: Option[] = tokens
  .filter(t => t.type === 'borderRadius')
  .map(t => ({
    label: t.attributes.type?.toUpperCase() || 'None',
    value: t.name,
  }))

type BorderRadiusSliderProps = {
  value?: string;
  setValue: SetLocationValueDispatch<string | undefined, string | undefined>;
};

export const BorderRadiusSlider: FC<BorderRadiusSliderProps> = ({ setValue, value }) => {
  const [currentValue, setCurrentValue] = useState<number>(() => {
    if (!options) return 0;
    const savedIndex = options.findIndex(option => String(option.value) === String(value));

    return savedIndex > -1 ? savedIndex : 0;
  });

  const handleValueChange = (value: number) => {
    setCurrentValue(value);
    setValue(() => ({ newValue: options[value].value }));
  };

  return (
    <div className="slider-style-container">
      <ReactSlider
        className="horizontal-slider"
        thumbClassName="slider-thumb"
        min={0}
        max={options?.length ? options?.length - 1 : 0}
        onChange={handleValueChange}
        step={1}
        value={currentValue}
      />
      <div className="slider-thumb-value">{options?.[currentValue].label}</div>
    </div>
  );
};
