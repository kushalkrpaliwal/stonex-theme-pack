import React, { FC, useEffect, useState } from 'react'
import { SegmentedControl, SegmentedControlOption } from '@uniformdev/design-system'
import { InputToggle, SetLocationValueDispatch } from '@uniformdev/mesh-sdk-react'
import { FlexBoxControls, FlexBoxValue } from '../../types/mesh'
import ReactSlider from 'react-slider'
import { tokens } from '../../tokens/tokens'

const FLEX_BOX_OPTIONS: FlexBoxControls = {
  alignItems: [
    { label: 'None', value: '' },
    { label: 'Left', value: 'items-start' },
    { label: 'Center', value: 'items-center' },
    { label: 'Right', value: 'items-end' },
    { label: 'Stretch', value: 'items-stretch' },
    { label: 'Baseline', value: 'items-baseline' },
  ],
  justifyContent: [
    { label: 'None', value: '' },
    { label: 'Start', value: 'justify-start' },
    { label: 'Center', value: 'justify-center' },
    { label: 'End', value: 'justify-end' },
    { label: 'Stretch', value: 'justify-stretch' },
    { label: 'Between', value: 'justify-between' },
    { label: 'Around', value: 'justify-around' },
    { label: 'Evenly', value: 'justify-evenly' },
  ],
  flexDirection: [
    { label: 'Row', value: 'flex-row' },
    { label: 'Row Reverse', value: 'flex-row-reverse' },
    { label: 'Column', value: 'flex-col' },
    { label: 'Column Reverse', value: 'flex-col-reverse' },
  ],
  gap: [
    { label: 'None', value: '' },
    ...tokens
      .filter((t, i, s) => s.indexOf(t) === i && t?.attributes?.category === 'gap')
      .map(t => ({
        // @ts-ignore
        label: t.attributes?.type?.toUpperCase(),
        value: t.name
      }))
      .reduce((acc: SegmentedControlOption<string>[], current: SegmentedControlOption<string>) => {
        const x = acc.find(item => item.value === current.value)
        if (!x) {
          acc.push(current)
        }
        return acc
      }, [])
  ],
}

const defaultState: FlexBoxValue = {
  useFlexBox: false,
  flexDirection: FLEX_BOX_OPTIONS.flexDirection[0].value,
  alignItems: FLEX_BOX_OPTIONS.alignItems[0].value,
  justifyContent: FLEX_BOX_OPTIONS.justifyContent[0].value,
  gap: FLEX_BOX_OPTIONS.gap[0].value,
}

type FlexBoxProps = {
  value?: FlexBoxValue;
  setValue: SetLocationValueDispatch<FlexBoxValue | undefined, FlexBoxValue | undefined>;
};

const FlexBox: FC<FlexBoxProps> = ({ value, setValue }: FlexBoxProps) => {
  const [currentGapValue, setCurrentGapValue] = useState<number>(() => {
    const savedIndex = FLEX_BOX_OPTIONS.gap.findIndex(g => String(g.value) === String(value?.gap))

    return savedIndex > -1 ? savedIndex : 0
  })

  useEffect(() => {
    setValue(previousValue => ({ newValue: previousValue || defaultState }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handelSetValue = (property: string, newValue: string | boolean) => {
    setValue((prev = defaultState) => {
      return {
        newValue: {
          ...prev,
          [property]: newValue,
        }
      }
    })
  }

  const handleGapValueChange = (index: number) => {
    setCurrentGapValue(index)
    handelSetValue('gap', FLEX_BOX_OPTIONS.gap[index].value)
  }

  return (
    <div className={'flex flex-col gap-xs'}>
      <InputToggle label="Use Flex Box features" type="checkbox" name="ice-cream" checked={value?.useFlexBox}
                   onChange={() => handelSetValue('useFlexBox', !value?.useFlexBox)}/>

      {value?.useFlexBox && (
        <>
          <p>Flex Direction</p>
          <SegmentedControl
            name="flexDirection"
            onChange={val => handelSetValue('flexDirection', val)}
            options={FLEX_BOX_OPTIONS.flexDirection}
            size="md"
            value={value?.flexDirection}
            noCheckmark
            orientation={'horizontal'}
          />
          <p>Align Items</p>
          <SegmentedControl
            name="alignItems"
            onChange={val => handelSetValue('alignItems', val)}
            options={FLEX_BOX_OPTIONS.alignItems}
            size="sm"
            value={value?.alignItems}
            noCheckmark
            orientation={'horizontal'}
          />
          <p>Justify Content</p>
          <SegmentedControl
            name="justifyContent"
            onChange={val => handelSetValue('justifyContent', val)}
            options={FLEX_BOX_OPTIONS.justifyContent}
            size="sm"
            value={value?.justifyContent}
            noCheckmark
            orientation={'horizontal'}
          />
          <p>Gap</p>
          <div className="slider-style-container">
            <ReactSlider
              className="horizontal-slider"
              thumbClassName="slider-thumb"
              min={0}
              max={FLEX_BOX_OPTIONS.gap.length ? FLEX_BOX_OPTIONS.gap.length - 1 : 0}
              onChange={handleGapValueChange}
              step={1}
              value={currentGapValue}
            />
            <div
              className="slider-thumb-value">{`${FLEX_BOX_OPTIONS.gap?.[currentGapValue].label}`}</div>
          </div>
        </>
      )}
    </div>
  )
}

export default FlexBox
