'use client'
import React, { useEffect, FC, ChangeEventHandler } from 'react'
import clsx from 'clsx'
import { SetLocationValueDispatch } from '@uniformdev/mesh-sdk-react'
import { spacing } from '../../tokens/tokens'

const spacingTokens = {
  'None': '',
  // @ts-ignore
  ...Object.fromEntries(
    Object.entries(spacing.padding).filter(([key]) => !key.includes('Button') && !key.includes('page'))
  ),
}
const borderTokens = {
  'None': '',
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
}

type Sides = {
  top: string;
  right: string;
  bottom: string;
  left: string;
};

export type BoxModelType = {
  padding: Sides;
  border: Sides;
  margin: Sides;
};

type BoxModelEditorProps = {
  value?: BoxModelType;
  setValue: SetLocationValueDispatch<BoxModelType | undefined, BoxModelType | undefined>;
};

const defaultState: BoxModelType = {
  padding: { top: '', right: '', bottom: '', left: '' },
  border: { top: '', right: '', bottom: '', left: '' },
  margin: { top: '', right: '', bottom: '', left: '' },
}

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
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (property: keyof BoxModelType, side: keyof Sides, value: string) => {
    setValue((prev = defaultState) => {
      return {
        newValue: {
          ...prev,
          [property]: {
            ...prev[property],
            [side]: value,
          },
        },
      }
    })
  }

  const renderControls = ({
    param,
    value,
    gridClassNames,
    onChange
  }: { param: string; value: string, onChange: (param: string) => void, gridClassNames: string }) => {
    const handleSelectChange: ChangeEventHandler<HTMLSelectElement> = event => {
      onChange(event.target.value)
    }

    return (
      <select
        className={clsx('appearance-none bg-transparent- font-bold text-center border-gray-50 justify-self-center m-4', gridClassNames)}
        value={value}
        onChange={handleSelectChange}
      >
        {Object.keys(param === 'border' ? borderTokens : spacingTokens).map(spacing => (
          <option key={spacing} value={spacing}>
            {spacing}
          </option>
        ))}
      </select>
    )
  }

  return (
    <div data-brand={'stonex'} data-theme={'light'}
         className={'grid grid-cols-7 grid-rows-7 font-body-xs-default overflow-hidden'}>
      <div
        className={'margin-box-layout grid grid-cols-7 grid-rows-7 col-start-1 row-start-1 col-span-7 row-span-7'}>
        <Background/>
        <span className={'box-model-label'}>Margin</span>
        {renderControls({
          param: 'margin',
          value: value?.margin.top || '',
          onChange: val => handleChange('margin', 'top', val),
          gridClassNames: 'col-start-4 row-start-1'
        })
        }
        {renderControls({
            param: 'margin',
            value: value?.margin.right || '',
            onChange: val => handleChange('margin', 'right', val),
            gridClassNames: 'col-start-7 row-start-4'
          }
        )}
        {renderControls({
            param: 'margin',
            value: value?.margin.bottom || '',
            onChange: val => handleChange('margin', 'bottom', val),
            gridClassNames: 'col-start-4 row-start-7'
          }
        )}
        {renderControls({
          param: 'margin',
          value: value?.margin.left || '',
          onChange: val => handleChange('margin', 'left', val),
          gridClassNames: 'col-start-1 row-start-4'
        })
        }
      </div>

      <div
        className={'border-box-layout grid grid-cols-5 grid-rows-5 col-start-2 row-start-2 col-span-5 row-span-5'}>
        <Background/>
        <span className={'box-model-label'}>Border</span>

        {renderControls({
          param: 'border',
          value: value?.border.top || '',
          onChange: val => handleChange('border', 'top', val),
          gridClassNames: 'col-start-3 row-start-1'
        })
        }
        {renderControls({
            param: 'border',
            value: value?.border.right || '',
            onChange: val => handleChange('border', 'right', val),
            gridClassNames: 'col-start-5 row-start-3'
          }
        )}
        {renderControls({
            param: 'border',
            value: value?.border.bottom || '',
            onChange: val => handleChange('border', 'bottom', val),
            gridClassNames: 'col-start-3 row-start-5'
          }
        )}
        {renderControls({
          param: 'border',
          value: value?.border.left || '',
          onChange: val => handleChange('border', 'left', val),
          gridClassNames: 'col-start-1 row-start-3'
        })
        }
      </div>

      <div
        className={'padding-box-layout grid grid-cols-3 grid-rows-3 col-start-3 row-start-3 col-span-3 row-span-3'}>
        <Background/>
        <span className={'box-model-label'}>Padding</span>

        {renderControls({
          param: 'padding',
          value: value?.padding.top || '',
          onChange: val => handleChange('padding', 'top', val),
          gridClassNames: 'col-start-2 row-start-1'
        })
        }
        {renderControls({
            param: 'padding',
            value: value?.padding.right || '',
            onChange: val => handleChange('padding', 'right', val),
            gridClassNames: 'col-start-3 row-start-2'
          }
        )}
        {renderControls({
            param: 'padding',
            value: value?.padding.bottom || '',
            onChange: val => handleChange('padding', 'bottom', val),
            gridClassNames: 'col-start-2 row-start-3'
          }
        )}
        {renderControls({
            param: 'padding',
            value: value?.padding.left || '',
            onChange: val => handleChange('padding', 'left', val),
            gridClassNames: 'col-start-1 row-start-2'
          }
        )}
      </div>

      <div className={'relative bg-Tints-Saturated-400 rounded-2 col-start-4 row-start-4 col-span-1 row-span-1'}/>
    </div>
  )
}

export default BoxModel
