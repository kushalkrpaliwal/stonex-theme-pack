import { FC, useEffect } from 'react';
import { SegmentedControl } from '@uniformdev/design-system';
import { SetLocationValueDispatch } from '@uniformdev/mesh-sdk-react';
import { Theme } from '../../types/common';
import { spacing } from '../../fe-app/src/tokens/tokens';

const spacingTokens = spacing.spacing;

export type SpacingOptionType = {
  label: string;
  value: string;
};

const SPACING_OPTIONS: SpacingOptionType[]= Object.entries(spacingTokens)
  .filter(([label]) => label !== 'none')
  .map(
  ([label, value]) => ({
    label,
    value: value as string,
  })
);

type SpacingParamsProps = {
  value?: SpacingOptionType;
  setValue: SetLocationValueDispatch<SpacingOptionType | undefined, SpacingOptionType | undefined>;
  selectedTheme: Theme;
};

const SpacingParam: FC<SpacingParamsProps> = ({ value, setValue }: SpacingParamsProps) => {
  useEffect(() => {
    setValue(previousValue => ({ newValue: previousValue }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handelSetValue = (newValue: string) => setValue(() => ({ newValue: SPACING_OPTIONS.find(option => option.value === newValue)}));

  return (
    <SegmentedControl
      name="spacingSelector"
      onChange={handelSetValue}
      options={SPACING_OPTIONS}
      size="sm"
      value={value?.value}
      noCheckmark
      orientation={'horizontal'}
    />
  );
};

export default SpacingParam;
