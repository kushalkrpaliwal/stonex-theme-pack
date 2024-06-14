import { FC, useEffect } from 'react'
import { SegmentedControl } from '@uniformdev/design-system'
import { InputToggle, SetLocationValueDispatch } from '@uniformdev/mesh-sdk-react'
import { FlexBoxControls, FlexBoxValue } from '../../types/mesh'

const FLEX_BOX_OPTIONS: FlexBoxControls = {
  alignItems: [
    { label: 'None', value: '' },
    { label: 'Left', value: 'items-left' },
    { label: 'Center', value: 'items-center' },
    { label: 'Right', value: 'items-right' },
    { label: 'Stretch', value: 'items-stretch' },
    { label: 'Auto', value: 'items-auto' },
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
}

const defaultState: FlexBoxValue = {
  useFlexBox: false,
  flexDirection: FLEX_BOX_OPTIONS.flexDirection[0].value,
  alignItems: FLEX_BOX_OPTIONS.alignItems[0].value,
  justifyContent: FLEX_BOX_OPTIONS.justifyContent[0].value,
}

type FlexBoxProps = {
  value?: FlexBoxValue;
  setValue: SetLocationValueDispatch<FlexBoxValue | undefined, FlexBoxValue | undefined>;
};

const FlexBox: FC<FlexBoxProps> = ({ value, setValue }: FlexBoxProps) => {
  useEffect(() => {
    setValue(previousValue => ({ newValue: previousValue || defaultState }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handelSetValue = (property: string, newValue: string | boolean) => {
    setValue((prev = defaultState) => {
      console.log({ property, newValue, prev })
      return {
        newValue: {
          ...prev,
          [property]: newValue,
        }
      }
    })
  }

  console.log({ value })

  return (
    <div className={'flex flex-col gap-xs'}>
      <InputToggle label="Use Flex Box features" type="checkbox" name="ice-cream" checked={value?.useFlexBox}
                   onChange={() => handelSetValue('useFlexBox', !value?.useFlexBox)}/>

      {value?.useFlexBox && (
        <>
          <SegmentedControl
            name="flexDirection"
            onChange={val => handelSetValue('flexDirection', val)}
            options={FLEX_BOX_OPTIONS.flexDirection}
            size="md"
            value={value?.flexDirection}
            noCheckmark
            orientation={'horizontal'}
          />
          <SegmentedControl
            name="alignItems"
            onChange={val => handelSetValue('alignItems', val)}
            options={FLEX_BOX_OPTIONS.alignItems}
            size="sm"
            value={value?.alignItems}
            noCheckmark
            orientation={'horizontal'}
          />
          <SegmentedControl
            name="justifyContent"
            onChange={val => handelSetValue('justifyContent', val)}
            options={FLEX_BOX_OPTIONS.justifyContent}
            size="sm"
            value={value?.justifyContent}
            noCheckmark
            orientation={'horizontal'}
          />
        </>
      )}
    </div>
  )
}

export default FlexBox
