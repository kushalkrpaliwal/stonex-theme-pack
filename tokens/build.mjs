import { permutateThemes, registerTransforms, transforms as sdTransforms } from '@tokens-studio/sd-transforms'
import StyleDictionary from 'style-dictionary'
import { promises } from 'fs'

const sourcePath = './src/figma/themes'

registerTransforms(StyleDictionary, {
  /* options here if needed */
})

StyleDictionary.registerTransform({
  name: 'css/url',
  type: 'value',
  matcher: token => token.name === 'background-image',
  transformer: token => `"${token.original.value}"`
})

// StyleDictionary.registerTransform({
//   name: 'name/border',
//   type: 'value',
//   matcher: token => token.type === 'borderRadius',
//   transformer: token => ({
//     ...token,
//     name: token.name.replace('border', 'rounded')
//   })
// })

async function run () {
  const $themes = JSON.parse(await promises.readFile(`${sourcePath}/$themes.json`, 'utf-8'))
  const deviceDesktop = JSON.parse(await promises.readFile(`${sourcePath}/device/desktop.json`, 'utf-8'))
  const deviceTablet = JSON.parse(await promises.readFile(`${sourcePath}/device/tablet.json`, 'utf-8'))
  const deviceMobile = JSON.parse(await promises.readFile(`${sourcePath}/device/mobile.json`, 'utf-8'))
  const tokenSetOrder = JSON.parse(await promises.readFile(`${sourcePath}/$metadata.json`, 'utf-8'))?.tokenSetOrder

  const themes = permutateThemes($themes, { separator: '/' })

  const cssTransforms = [
    'attribute/cti',
    'name/cti/kebab',
    'ts/resolveMath',
    'ts/color/css/hexrgba',
    'ts/descriptionToComment',
    'ts/size/css/letterspacing',
    'ts/size/px',
    'ts/size/lineheight',
    'ts/typography/fontWeight',
    'ts/typography/css/fontFamily',
    'ts/typography/css/shorthand',
    'ts/shadow/css/shorthand',
    'ts/border/css/shorthand',
    'ts/opacity',
    'css/url',
    // 'name/border'
  ]

  const globalTransforms = [
    ...sdTransforms,
    ...cssTransforms
  ]

  const baseConfig = {
    format: {
      createArray: ({ dictionary: { allTokens } }) => JSON.stringify(allTokens),
    },
    preprocessors: ['tokens-studio'], // <-- since 0.16.0 this must be explicit
  }

  const baseCssFormatOptions = {
    showFileHeader: false,
    outputReferences: true,
  }

  const configs = Object.entries(themes).map(([name, tokensSets]) => {
    const filePath = name.replace('-', '/').replace('ci', 'cityindex')
    const theme = filePath.split('/').length > 2
      ? filePath.split('/')[1]
      : null
    const brand = filePath.split('/')[0]
    const device = filePath.split('/')[brand === 'wireframe' ? 1 : 2]

    return {
      ...baseConfig,
      filePath,
      brand,
      theme,
      device,
      selector: [brand && `[data-brand='${brand}']`, theme && `[data-theme='${theme}']`].join(' '),
      source: tokensSets.map(tokenSet => `${sourcePath}/${tokenSet}.json`),
    }
  })

  const brands = configs.map(({
      filePath,
      brand,
      theme,
      device,
      selector,
      source,
      format,
      preprocessors,
    }) => {
      const breakpoint = device === 'desktop'
        ? deviceDesktop.screen.width.value
        : device === 'tablet'
          ? deviceTablet.screen.width.value
          : deviceMobile.screen.width.value
      return {
        source,
        format,
        preprocessors,
        platforms: {
          StonexWeb: {
            transforms: globalTransforms,
            files: [
              // Base
              {
                destination: `output/css/brand/${brand}/base.css`,
                format: 'css/variables',
                options: {
                  ...baseCssFormatOptions,
                  selector: `[data-brand='${brand}']`
                },
                filter: token => token.filePath.endsWith('/base.json')
              },
              {
                destination: `output/json/brand/${brand}/base.json`,
                format: 'createArray',
                filter: token => token.filePath.endsWith('/base.json')
              },

              // Theme related
              {
                destination: `output/css/brand/${brand}/${theme}.css`,
                format: 'css/variables',
                options: {
                  ...baseCssFormatOptions,
                  selector
                },
                filter: token => token.filePath.startsWith('brand')
                  && !token.filePath.endsWith('/base.json')
              },
              {
                destination: `output/json/brand/${brand}/${theme}.json`,
                format: 'createArray',
                filter: token => token.filePath.startsWith('brand')
                  && !token.filePath.endsWith('/base.json')
              },

              // Device related
              {
                destination: `output/css/brand/${brand}/device/${device}.css`,
                format: 'css/variables',
                options: {
                  ...baseCssFormatOptions,
                  selector: `@media (min-width: ${breakpoint}) [data-brand='${brand}']`
                },
                filter: token => token.filePath.startsWith('device')
              },
              {
                destination: `output/json/brand/${brand}/device/${device}.json`,
                format: 'createArray',
                filter: token => token.filePath.startsWith('device')
              },
            ],
          },
        },
      }
    }
  )

  const globals = tokenSetOrder
    .filter(name => name.startsWith('global') || name.startsWith('alias'))
    .map(name => {
      return {
        ...baseConfig,
        source: tokenSetOrder.map(tokenSet => `${sourcePath}/${tokenSet}.json`),
        platforms: {
          globals: {
            transforms: cssTransforms,
            files: [
              {
                destination: `output/css/${name}.css`,
                format: 'css/variables',
                options: baseCssFormatOptions,
                filter: token => token.filePath.startsWith(name)
              },
              {
                destination: `output/json/${name}.json`,
                format: 'createArray',
                filter: token => token.filePath.startsWith(name)
              },
            ],
          },
        }
      }
    })

  globals.forEach(glb => {
    const sd = StyleDictionary.extend(glb)
      .cleanAllPlatforms()
      .buildAllPlatforms()
  })

  brands.forEach(brand => {
    const sd = StyleDictionary.extend(brand)
      .cleanAllPlatforms()
      .buildAllPlatforms()
  })
}

run()
