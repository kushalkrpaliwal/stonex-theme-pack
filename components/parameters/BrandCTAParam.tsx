'use client';
import { FC, useEffect } from 'react';
import { SegmentedControl } from '@uniformdev/design-system';
import { SetLocationValueDispatch } from '@uniformdev/mesh-sdk-react';


export type BrandCTAProps = {
  size?: 'sm' | 'lg';
  type?: 'primary' | 'secondary' | 'tertiary';
  style?: 'brand' | 'info' | 'success' | 'warning' | 'error';
  className?: string;
};

type CtaClassNameProps = Pick<BrandCTAProps, 'style' | 'type'>;

export const createCtaClassName = ({ style, type }: CtaClassNameProps) =>
  `cta-button-${style || 'brand'}-${type || 'primary'}`;

type BrandCTAParamsProps = {
  value?: BrandCTAProps;
  setValue: SetLocationValueDispatch<BrandCTAProps | undefined, BrandCTAProps | undefined>;
};

const defaultState: BrandCTAProps = {
  size: 'sm',
  type: 'primary',
  style: 'brand',
  className: 'cta-button-brand-primary',
};

const BrandCTAParam: FC<BrandCTAParamsProps> = ({ value, setValue }: BrandCTAParamsProps) => {
  useEffect(() => {
    setValue(previousValue => ({
      newValue:
        {
          ...previousValue,
          className: createCtaClassName({ style: previousValue?.style, type: previousValue?.type }),
        } || defaultState,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSetValue = (newValue: BrandCTAProps) =>
    setValue(() => ({
      newValue: {
        ...newValue,
        className: createCtaClassName({ style: newValue.style, type: newValue.type }),
      },
    }));

  return (
    <>
      <p>Style:</p>
      <SegmentedControl
        onChange={style => handleSetValue({ ...value, style })}
        name="brandCtaStyleSelector"
        options={[
          { value: 'brand', label: 'Brand' },
          { value: 'info', label: 'Info' },
          { value: 'success', label: 'Success' },
          { value: 'warning', label: 'Warning' },
          { value: 'error', label: 'Error' },
        ]}
        size="sm"
        value={value?.style || 'brand'}
        noCheckmark
        orientation={'horizontal'}
      />
      <br />
      <p>Type:</p>
      <SegmentedControl
        onChange={type => handleSetValue({ ...value, type })}
        name="brandCtaTypeSelector"
        options={[
          { value: 'primary', label: 'Primary' },
          { value: 'secondary', label: 'Secondary' },
          { value: 'tertiary', label: 'Tertiary' },
        ]}
        size="sm"
        value={value?.type || 'primary'}
        noCheckmark
        orientation={'horizontal'}
      />
      <br />
      <p>Size:</p>
      <SegmentedControl
        onChange={size => handleSetValue({ ...value, size })}
        name="brandCtaSizeSelector"
        options={[
          { value: 'sm', label: 'Small' },
          { value: 'lg', label: 'Large' },
        ]}
        size="sm"
        value={value?.size || 'sm'}
        noCheckmark
        orientation={'horizontal'}
      />
    </>
  );
};

export default BrandCTAParam;
