import { FC, useEffect, useMemo } from 'react';
import { SetLocationValueDispatch, ValidationResult } from '@uniformdev/mesh-sdk-react';
import CalloutNonThemeSelected from './CalloutNonThemeSelected';
import { TRUE_VALIDATION_RESULT } from '../../constants';
import { SettingsParams } from '../../types/mesh';
import { Theme } from '../../types/common';
import Image from 'next/image'

const validate = (settings?: SettingsParams): ValidationResult => {
  if (!settings?.selectedThemeName) {
    return {
      isValid: false,
      validationMessage: 'The theme must be set up',
    };
  }
  return TRUE_VALIDATION_RESULT;
};

type SetUpThemeParamProps = {
  value?: Theme;
  settings?: SettingsParams;
  setValue: SetLocationValueDispatch<Theme | undefined, Theme | undefined>;
  required?: boolean;
};

const SetUpThemeParam: FC<SetUpThemeParamProps> = ({ value, settings, setValue, required = false }) => {
  const newTheme = useMemo(
    () => settings?.themes?.[settings?.selectedThemeName],
    [settings?.selectedThemeName, settings?.themes]
  );

  useEffect(
    () => {
      const validateResult = validate(settings);
      if (!validateResult.isValid || value !== newTheme) {
        setValue(() => ({
          newValue: newTheme,
          options: required ? validateResult : undefined,
        }));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  if (!newTheme) return <CalloutNonThemeSelected />;
  return (
    <div className="theme-item selected-theme-item">
      <p>{newTheme.themeLabel}</p>
      <Image src={newTheme.iconUrl} alt={newTheme.themeLabel} width={100} height={50} style={{ objectFit: 'contain' }} />
    </div>
  );
};

export default SetUpThemeParam;
