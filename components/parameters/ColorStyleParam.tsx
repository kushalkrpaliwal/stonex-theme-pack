import React, { FC, MouseEvent, useEffect } from 'react';
import { SetLocationValueDispatch, ValidationResult } from '@uniformdev/mesh-sdk-react';
import { Theme } from '../../types/common';
import { TRUE_VALIDATION_RESULT } from '../../constants';

import { colors as colorTokens } from '../../fe-app/src/tokens/tokens';
import { NestedObject } from '../../fe-app/src/tokens/fns';

const validate = (value?: string): ValidationResult => {
  if (!value) {
    return {
      isValid: false,
      validationMessage: 'The Color Style must be selected',
    };
  }
  return TRUE_VALIDATION_RESULT;
};

const parseObject = (obj: NestedObject, prefix = '') => {
  const result: { label: string; value: string }[] = [];

  for (const key in obj) {
    if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      result.push(...parseObject(obj[key] as NestedObject, `${prefix}${key}-`));
    } else {
      result.push({
        label: prefix ? `${prefix}${key}` : key,
        value: obj[key] as string,
      });
    }
  }

  return result;
};

const result = parseObject(colorTokens);

type ColorStyleParamProps = {
  value?: string;
  selectedTheme?: Theme;
  setValue: SetLocationValueDispatch<string | undefined, string | undefined>;
  required?: boolean;
};

const ColorStyleParam: FC<ColorStyleParamProps> = ({ value, setValue, selectedTheme, required = false }) => {
  useEffect(() => {
    if (!required) return;

    setValue(previousValue => ({
      newValue: previousValue,
      options: validate(previousValue),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handelSaveValue = (e: MouseEvent<HTMLButtonElement>) => {
    const { name: currentValue } = (e.target as HTMLButtonElement) || {};
    setValue(() => {
      const newValue = currentValue === value ? undefined : currentValue;
      return {
        newValue,
        options: required ? validate(newValue) : undefined,
      };
    });
  };

  return (
    <div
      className="button-style-container"
      data-brand={selectedTheme?.themeName == 'cityIndex' ? 'ci' : selectedTheme?.themeName}
      data-theme={'light'}
    >
      {result.map((item, index) => (
        <button
          key={`${item.value}-${index}`}
          className={`style-item ${item.value === value ? 'style-item-selected' : ''}`}
          name={item.value}
          title={item.label}
          style={{ background: item.value }}
          onClick={handelSaveValue}
        />
      ))}
    </div>
  );
};

export default ColorStyleParam;
