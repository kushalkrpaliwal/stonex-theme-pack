import { FC, useEffect } from 'react';
import { SegmentedControl, SegmentedControlOption } from '@uniformdev/design-system'
import { SetLocationValueDispatch } from '@uniformdev/mesh-sdk-react';
import { Theme } from '../../types/common';
import { spacing } from '../../tokens/tokens';

const spacingTokens = spacing.spacing;

const SPACING_OPTIONS: SegmentedControlOption<string>[]= Object.entries(spacingTokens)
  .filter(([label]) => label !== 'none')
  .map(
  ([label, value]) => ({
    label,
    value: value as string,
  })
);

type SpacingParamsProps = {
  value?: string;
  setValue: SetLocationValueDispatch<string | undefined, string | undefined>;
  selectedTheme: Theme;
};

const SpacingParam: FC<SpacingParamsProps> = ({ value, setValue }: SpacingParamsProps) => {
  useEffect(() => {
    setValue(previousValue => ({ newValue: previousValue }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handelSetValue = (newValue: string) => setValue(() => ({ newValue: SPACING_OPTIONS.find(option => option.value === newValue)?.value}));

  return (
    <SegmentedControl
      name="spacingSelector"
      onChange={handelSetValue}
      options={SPACING_OPTIONS}
      size="sm"
      value={value}
      noCheckmark
      orientation={'horizontal'}
    />
  );
};

export default SpacingParam;
