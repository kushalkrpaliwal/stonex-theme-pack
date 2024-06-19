import React, { FC, useMemo, useState } from 'react'
import { Button, Callout, useMeshLocation } from '@uniformdev/mesh-sdk-react'
import { LoadingOverlay } from '@uniformdev/design-system'
import ThemesSelector from '../components/ThemeSelector'
import { SettingsParams } from '../types/mesh'
import { ClientError, Theme } from '../types/common'
import StaticBrands from '../public/staticThemes.json'
import { tokens } from '../tokens/tokens'

const DefaultSettings: SettingsParams = {
  selectedThemeName: StaticBrands[0].themeName,
  themes: StaticBrands.reduce(
    (acc, theme) => {
      acc[theme.themeName] = theme
      return acc
    },
    {} as { [name: string]: Theme }
  ),
}

const Settings: FC = () => {
  const { value, setValue } = useMeshLocation<'settings', SettingsParams>()
  const [formValue, setFormValue] = useState<SettingsParams>({
    selectedThemeName: value.selectedThemeName || DefaultSettings.selectedThemeName,
    themes: value.themes || DefaultSettings.themes,
  })

  const selectedTheme = useMemo(
    () => formValue.themes?.[formValue.selectedThemeName],
    [formValue.selectedThemeName, formValue.themes]
  )

  const [isLoading, setIsLoading] = useState(false)
  const [isNeedToSave, setIsNeedToSave] = useState(false)
  const [infoMessage, setInfoMessage] = useState<ClientError | null>(null)
  const [actionMessage, setActionMessage] = useState<ClientError | null>(null)

  const handelSetTheme = (theme: Theme) => {
    setFormValue((prevState: SettingsParams) => ({
      selectedThemeName: theme.themeName,
      themes: { ...prevState.themes, [theme.themeName]: theme },
    }))
    setActionMessage(null)
    setIsNeedToSave(true)
  }

  const handleSaveClick = async () => {
    setIsLoading(true)
    try {
      await setValue(() => ({ newValue: formValue }))
      setInfoMessage({
        type: 'success',
        title: 'Your theme configuration was saved successfully.',
        text: `To apply theme changes to your app, please wait until i found the way to do it.`,
      })
      setActionMessage({
        type: 'success',
        text: 'Saved',
      })
      setIsNeedToSave(false)
    } catch (error) {
      setInfoMessage({ type: 'error', title: 'Unable to save theme configuration.', text: error.message })
      setActionMessage({
        type: 'error',
        text: 'Error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const colors = tokens
    .filter(t => t.type === 'color' && t.filePath.includes(selectedTheme?.themeName.toLowerCase()))
    .map(t => ({
      label: t.attributes.type || 'None',
      value: t.name,
    }))

  return (
    <div className="settings-container" data-brand={selectedTheme?.themeName.toLowerCase()} data-theme={"light"}>
      <LoadingOverlay isActive={isLoading} statusMessage="Saving..."/>
      <Callout title="Important" type="caution">
        Type something smart and link to{' '}
        <a
          href="https://github.com/uniformdev/uniform-component-starter-kit#readme"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>
      </Callout>

      <div className="settings-theme-container">
        <div className="theme-selector-container">
          <p>Choose theme:</p>
          <ThemesSelector themes={formValue.themes} setTheme={handelSetTheme} selectedTheme={selectedTheme}/>
        </div>

        <div className="settings-color-panel-container">
          <p>Style Sheet overview</p>
          {selectedTheme ? (
            <>
              <div className={'flex gap-xs flex-wrap'}>
                {colors.map((item, index) => (
                  <div
                    key={item.value + index}
                    className={`w-48 h-48 rounded-Button`}
                    style={{ background: `var(--${item.value})` }}
                  />
                ))}
              </div>
              <div className="container-settings-button">
                <Button
                  type="button"
                  buttonType="secondary"
                  onClick={handleSaveClick}
                  disabled={isLoading || !isNeedToSave}
                >
                  Save
                </Button>
                {actionMessage && <Callout type={actionMessage.type}>{actionMessage.text}</Callout>}
              </div>
            </>
          ) : (
            <Callout type="info" title="Select the theme">
              <p>You can choose one of the suggested themes or customize it as you wish</p>
            </Callout>
          )}
        </div>
      </div>

      {infoMessage && (
        <Callout title={infoMessage.title} type={infoMessage.type}>
          {infoMessage.text}
        </Callout>
      )}
    </div>
  )
}

export default Settings
