import { FC } from 'react';
import { Theme } from '../types/common';
import Image from 'next/image';

type StaticThemesSelectorProps = {
  themes: { [name: string]: Theme };
  setTheme: (theme: Theme) => void;
  selectedTheme?: Theme;
};
const StaticThemesSelector: FC<StaticThemesSelectorProps> = ({ themes, selectedTheme, setTheme }) => (
  <>
    {Object.values(themes).map((theme, index) => {
      const isSelectedTheme = selectedTheme?.themeName === theme.themeName;
      return (
        <div
          key={`${theme.themeName}-${index}`}
          className={`theme-item ${isSelectedTheme ? 'selected-theme-item' : ''}`}
          onClick={!isSelectedTheme ? () => setTheme(theme) : undefined}
        >
          <Image src={theme.iconUrl} alt={theme.themeLabel} width={100} height={50} style={{ objectFit: 'contain' }} />

          <p>{theme.themeLabel}</p>
        </div>
      );
    })}
  </>
);

export default StaticThemesSelector;
