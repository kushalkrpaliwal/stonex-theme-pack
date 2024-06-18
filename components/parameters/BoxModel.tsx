'use client';
import React, { useEffect, FC, ChangeEventHandler } from 'react'
import clsx from 'clsx';
import { SetLocationValueDispatch } from '@uniformdev/mesh-sdk-react';
import { spacing } from '../../tokens/tokens';

const spacingTokens = spacing.spacing;

export type BoxModelType = {
  padding: Sides;
  border: Sides;
  margin: Sides;
};

type Sides = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

type BoxModelEditorProps = {
  value?: BoxModelType;
  setValue: SetLocationValueDispatch<BoxModelType | undefined, BoxModelType | undefined>;
};

const defaultState: BoxModelType = {
  padding: { top: 0, right: 0, bottom: 0, left: 0 },
  border: { top: 0, right: 0, bottom: 0, left: 0 },
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
};

const Background = () => <svg preserveAspectRatio="none" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
  <polygon points="0,0 100,50 0,100" fill="#dfe6ef"/>
  <polygon points="200,0 100,50 200,100" fill="#dfe6ef"/>
  <polygon points="0,0 100,50 200,0" fill="#f3f8fe"/>
  <polygon points="0,100 100,50 200,100" fill="#f3f8fe"/>
</svg>

const BoxModel: FC<BoxModelEditorProps> = ({ value, setValue }: BoxModelEditorProps) => {
  useEffect(() => {
    setValue(previousValue => {
      return {
        newValue: previousValue || defaultState,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (property: keyof BoxModelType, side: keyof Sides, value: number) => {
    setValue((prev = defaultState) => {
      return {
        newValue: {
          ...prev,
          [property]: {
            ...prev[property],
            [side]: value,
          },
        },
      };
    });
  };

  const renderControls = (value: number, onChange: (param: number) => void, gridClassNames: string) => {
    const handleSelectChange: ChangeEventHandler<HTMLSelectElement> = event => {
      onChange(parseInt(event.target.value));
    };

    return (
      <select
        className={clsx('appearance-none bg-transparent- font-bold text-center border-gray-50 justify-self-center m-4', gridClassNames)}
        value={value}
        onChange={handleSelectChange}
      >
        <option value={0}>{0}</option>
        {Object.keys(spacingTokens).map(spacing => (
          <option key={spacing} value={spacing}>
            {spacing}
          </option>
        ))}
      </select>
    );
  };

  return (
    <div data-brand={"stonex"} data-theme={"light"}
         className={'grid grid-cols-7 grid-rows-7 font-body-xs-default overflow-hidden'}>
      <div
        className={'margin-box-layout grid grid-cols-7 grid-rows-7 col-start-1 row-start-1 col-span-7 row-span-7'}>
        <Background/>
        <span className={'box-model-label'}>Margin</span>
        {renderControls(value?.margin.top || 0, val => handleChange('margin', 'top', val), 'col-start-4 row-start-1')}
        {renderControls(
          value?.margin.right || 0,
          val => handleChange('margin', 'right', val),
          'col-start-7 row-start-4'
        )}
        {renderControls(
          value?.margin.bottom || 0,
          val => handleChange('margin', 'bottom', val),
          'col-start-4 row-start-7'
        )}
        {renderControls(value?.margin.left || 0, val => handleChange('margin', 'left', val), 'col-start-1 row-start-4')}
      </div>

      <div
        className={'border-box-layout grid grid-cols-5 grid-rows-5 col-start-2 row-start-2 col-span-5 row-span-5'}>
        <Background/>
        <span className={'box-model-label'}>Border</span>

        {renderControls(value?.border.top || 0, val => handleChange('border', 'top', val), 'col-start-3 row-start-1')}
        {renderControls(
          value?.border.right || 0,
          val => handleChange('border', 'right', val),
          'col-start-5 row-start-3'
        )}
        {renderControls(
          value?.border.bottom || 0,
          val => handleChange('border', 'bottom', val),
          'col-start-3 row-start-5'
        )}
        {renderControls(value?.border.left || 0, val => handleChange('border', 'left', val), 'col-start-1 row-start-3')}
      </div>

      <div
        className={'padding-box-layout grid grid-cols-3 grid-rows-3 col-start-3 row-start-3 col-span-3 row-span-3'}>
        <Background/>
        <span className={'box-model-label'}>Padding</span>

        {renderControls(value?.padding.top || 0, val => handleChange('padding', 'top', val), 'col-start-2 row-start-1')}
        {renderControls(
          value?.padding.right || 0,
          val => handleChange('padding', 'right', val),
          'col-start-3 row-start-2'
        )}
        {renderControls(
          value?.padding.bottom || 0,
          val => handleChange('padding', 'bottom', val),
          'col-start-2 row-start-3'
        )}
        {renderControls(
          value?.padding.left || 0,
          val => handleChange('padding', 'left', val),
          'col-start-1 row-start-2'
        )}
      </div>

      <div className={'relative bg-Tints-Saturated-400 rounded-2 col-start-4 row-start-4 col-span-1 row-span-1'}/>
    </div>
  );
};

export default BoxModel;
