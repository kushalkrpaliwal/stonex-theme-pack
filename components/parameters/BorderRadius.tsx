import React, { FC } from 'react';
import { SetLocationValueDispatch } from '@uniformdev/mesh-sdk-react';
import { tokens } from '../../tokens/tokens'
import { SegmentedControl } from '@uniformdev/design-system'

type Option = {
  value: string;
  label: string;
};

const options: Option[] = [
  {
    label: 'None',
    value: '',
  },
  ...tokens
    .filter(t => t.type === 'borderRadius' && t.filePath.includes('wireframe'))
    .map(t => ({
      label: t.attributes.type || 'None',
      value: t.name,
    })),
]


type BorderRadiusSliderProps = {
  value?: string;
  setValue: SetLocationValueDispatch<string | undefined, string | undefined>;
};

export const BorderRadiusSlider: FC<BorderRadiusSliderProps> = ({ setValue, value }) => {
  const handleValueChange = (value: string) => {
    setValue(() => ({ newValue: value }));
  };

  return (
    <SegmentedControl
      name="flexDirection"
      onChange={handleValueChange}
      options={options}
      size="sm"
      value={value}
      noCheckmark
      orientation={'horizontal'}
    />
  );
};
