import React, { FC } from 'react';
import { SetLocationValueDispatch } from '@uniformdev/mesh-sdk-react';
import { SegmentedControl, SegmentedControlOption } from '@uniformdev/design-system'
import { getBorderRadiusTokens } from '../helpers/getTokensMap'

const options= getBorderRadiusTokens()

type BorderRadiusParamProps = {
  value?: string;
  setValue: SetLocationValueDispatch<string | undefined, string | undefined>;
};

export const BorderRadiusParam: FC<BorderRadiusParamProps> = ({ setValue, value }) => {
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
