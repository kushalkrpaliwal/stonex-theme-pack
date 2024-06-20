import React, { FC } from 'react';
import { Callout, SetLocationValueDispatch, useMeshLocation } from '@uniformdev/mesh-sdk-react';
import TitleStyleParam from '../components/parameters/TitleStyleParam';
import SpacingParam from '../components/parameters/SpacingParam'
import { ThemePackParameters } from '../constants';
import { FlexBoxValue, MeshThemePackParametersDefinition, SettingsParams, SliderOptions } from '../types/mesh'
import ReadOnlyContainer from '../components/ReadOnlyContainer';
import ColorStyleParam from '../components/parameters/ColorStyleParam';
import BrandCTAParam, { BrandCTAProps } from '../components/parameters/BrandCTAParam'
import BoxModel, { BoxModelType } from '../components/parameters/BoxModel';
import { BorderRadiusParam } from '../components/parameters/BorderRadius';
import { BoxShadow } from '../components/parameters/BoxShadow'
import FlexBox from '../components/parameters/FlexBox'
import SetUpThemeParam from '../components/parameters/SetUpThemeParam'
import { Theme } from '../types/common';
import { GapParam } from '../components/parameters/Gap'

const ThemePackParametersEditor: FC = () => {
  const { value, setValue, metadata, isReadOnly } = useMeshLocation<'paramType', string | undefined>();

  const { selectedThemeName, themes } = (metadata?.settings as SettingsParams) || {};

  const selectedParameter = (metadata.parameterDefinition as MeshThemePackParametersDefinition).type || '';

  switch (selectedParameter) {
    case ThemePackParameters.setUpTheme:
      return (
        <ReadOnlyContainer isReadOnly={isReadOnly}>
          <SetUpThemeParam
            value={value as Theme | undefined}
            settings={metadata?.settings as SettingsParams | undefined}
            setValue={setValue as SetLocationValueDispatch<Theme | undefined, Theme | undefined>}
            required={true}
          />
        </ReadOnlyContainer>
      );
    case ThemePackParameters.titleStyle:
      return (
        <ReadOnlyContainer isReadOnly={isReadOnly}>
          <TitleStyleParam
            value={value as string}
            setValue={setValue as SetLocationValueDispatch<string | undefined, string | undefined>}
          />
        </ReadOnlyContainer>
      );
    case ThemePackParameters.spacingParam:
      return (
        <ReadOnlyContainer isReadOnly={isReadOnly}>
          <SpacingParam
            value={value as string}
            selectedTheme={themes?.[selectedThemeName]}
            setValue={setValue as SetLocationValueDispatch<string | undefined, string | undefined>}
          />
        </ReadOnlyContainer>
      );
    case ThemePackParameters.gapParam:
      return (
        <ReadOnlyContainer isReadOnly={isReadOnly}>
          <GapParam
            value={value as string}
            setValue={setValue}
          />
        </ReadOnlyContainer>
      );
    case ThemePackParameters.colorParam:
      return (
        <ReadOnlyContainer isReadOnly={isReadOnly}>
          <ColorStyleParam
            value={value as string}
            setValue={setValue as SetLocationValueDispatch<string | undefined, string | undefined>}
            selectedTheme={themes?.[selectedThemeName]}
          />
        </ReadOnlyContainer>
      );
    case ThemePackParameters.brandCtaParam:
      return (
        <ReadOnlyContainer isReadOnly={isReadOnly}>
          <BrandCTAParam
            value={value as BrandCTAProps}
            setValue={setValue as SetLocationValueDispatch<BrandCTAProps | undefined, BrandCTAProps | undefined>}
          />
        </ReadOnlyContainer>
      );
    case ThemePackParameters.boxModel:
      return (
        <ReadOnlyContainer isReadOnly={isReadOnly}>
          <BoxModel
            value={value as BoxModelType | undefined}
            setValue={setValue as SetLocationValueDispatch<BoxModelType | undefined, BoxModelType | undefined>}
          />
        </ReadOnlyContainer>
      );
    case ThemePackParameters.broderRadiusParam:
      return (
        <ReadOnlyContainer isReadOnly={isReadOnly}>
          <BorderRadiusParam
            value={value as string}
            setValue={setValue as SetLocationValueDispatch<string | undefined, string | undefined>}
          />
        </ReadOnlyContainer>
      );
    case ThemePackParameters.boxShadowParam:
      return (
        <ReadOnlyContainer isReadOnly={isReadOnly}>
          <BoxShadow
            value={value as string}
            setValue={setValue as SetLocationValueDispatch<string | undefined, string | undefined>}
          />
        </ReadOnlyContainer>
      );
    case ThemePackParameters.flexBoxParam:
      return (
        <ReadOnlyContainer isReadOnly={isReadOnly}>
          <FlexBox
            value={value as FlexBoxValue | undefined}
            setValue={setValue as SetLocationValueDispatch<FlexBoxValue | undefined, FlexBoxValue | undefined>}
          />
        </ReadOnlyContainer>
      );
    default:
      return (
        <Callout type="error">
          <p>{`It looks like parameter ${selectedParameter} was not found`}</p>
        </Callout>
      );
  }
};

export default ThemePackParametersEditor;
