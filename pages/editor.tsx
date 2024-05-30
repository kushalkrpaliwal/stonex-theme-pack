import React, { FC } from 'react';
import { Callout, SetLocationValueDispatch, useMeshLocation } from '@uniformdev/mesh-sdk-react';
import TitleStyleParam from '../components/parameters/TitleStyleParam';
import SpacingParam, { SpacingOptionType } from '../components/parameters/SpacingParam'
import { ThemePackParameters } from '../constants';
import { MeshThemePackParametersDefinition, SettingsParams } from '../types/mesh';
import ReadOnlyContainer from '../components/ReadOnlyContainer';
import ColorStyleParam from '../components/parameters/ColorStyleParam';
import BrandCTAParam, { BrandCTAProps } from '../components/parameters/BrandCTAParam'
import BoxModelEditor, { BoxModel } from '../components/parameters/BoxModelEditor';
import { BorderRadiusSlider } from '../components/parameters/BorderRadius';
import { BoxShadow } from '../components/parameters/BoxShadow'

const ThemePackParametersEditor: FC = () => {
  const { value, setValue, metadata, isReadOnly } = useMeshLocation<'paramType', string | BrandCTAProps | undefined>();

  const { selectedThemeName, themes } = (metadata?.settings as SettingsParams) || {};

  const selectedParameter = (metadata.parameterDefinition as MeshThemePackParametersDefinition).type || '';

  switch (selectedParameter) {
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
            value={value as SpacingOptionType}
            selectedTheme={themes?.[selectedThemeName]}
            setValue={setValue as SetLocationValueDispatch<SpacingOptionType | undefined, SpacingOptionType | undefined>}
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
    case ThemePackParameters.boxModelEditor:
      return (
        <ReadOnlyContainer isReadOnly={isReadOnly}>
          <BoxModelEditor
            value={value as BoxModel}
            setValue={setValue as SetLocationValueDispatch<BoxModel | undefined, BoxModel | undefined>}
          />
        </ReadOnlyContainer>
      );
    case ThemePackParameters.broderRadiusParam:
      return (
        <ReadOnlyContainer isReadOnly={isReadOnly}>
          <BorderRadiusSlider
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
    default:
      return (
        <Callout type="error">
          <p>{`It looks like parameter ${selectedParameter} was not found`}</p>
        </Callout>
      );
  }
};

export default ThemePackParametersEditor;
