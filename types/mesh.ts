import { Theme } from './common'
import { SegmentedControlOption } from '@uniformdev/design-system'

export const enum SliderType {
  Custom = 'custom',
  Steps = 'steps',
}

export type SliderOptions = {
  label: string;
  value: string;
};

export interface MeshThemePackParametersConfig {
  required?: boolean;
  minValue?: number;
  maxValue?: number;
  step?: number;
  units?: string;
  type?: SliderType;
  options?: SliderOptions[];
}

export interface MeshThemePackParametersDefinition {
  type: string;
}

export interface SettingsParams {
  selectedThemeName: string;
  themes: {
    [name: string]: Theme;
  };
}

export interface FlexBoxControls {
  alignItems: SegmentedControlOption<string>[];
  justifyContent: SegmentedControlOption<string>[];
  flexDirection: SegmentedControlOption<string>[];
  gap: SegmentedControlOption<string>[];
}

export interface FlexBoxValue {
  useFlexBox: boolean;
  alignItems: string;
  justifyContent: string;
  flexDirection: string;
  gap: string;
}
