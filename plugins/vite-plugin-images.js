import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import sharp from 'sharp'

/**
 * @typedef {object} VitePluginCuratedImageOptimizerOptions
 * 
 * @property {Record<string, VitePluginCuratedImageOptimizerPresetOptions>} presetsConfig 
 */

/**
 * @typedef {object} VitePluginCuratedImageOptimizerPresetOptions
 * 
 * @property {number} width - specify the desired output width
 * @property {number} height - specify the desired output height
 * @property {number} [quality] - Image output quality. Defaults to 70
 * @property {"jpg"|"webp"|"png"} [format] - Desired output format.
 * Leave blank to keep the same image format as the original file
 */

const VIRTUAL_MODULE = "virtual:curated-images"
const RESOLVED = "\0" + VIRTUAL_MODULE

const fileRegex = /\.(jpe?g|webp|tiff?|avif|png)$/i;

const mimeTypes = {
  'jpg': 'image/jpeg',
  'jpeg': 'image/jpeg',
  'png': 'image/png',
  'webp': 'image/webp',
  'avif': 'image/avif',
  'heif': 'image/heif'
}

/**
 * @param {object} settings
 * @param {object[]} [settings.posts]
 * @param {string} [settings.baseUrl]
 * @param {VitePluginCuratedImageOptimizerOptions} [settings.presets]
 * 
 * @returns {import("vite").Plugin}
 */
export default function vitePluginImages (settings) {

  let cfg = false;
  const name = 'vite-plugin-images';
  const enforce = 'pre';

  const { posts, baseUrl, basePath, presets } = settings;

  const entries = new Map(Object.entries(presets))

  function configureServer (server) {

    server.middlewares.use(async (req, res, next) => {
      const { url } = req;
      const transformConfig = parseImageRequest(url);
      
      if (!transformConfig) {
        return next();
      }
      
      const { data, info, outPath } = await transformImage(transformConfig)

      if (!info) {
        res.statusCode = 400;
        res.end()
        return;
      }

      res.statusCode = 200;
      res.setHeader("Content-Type", mimeTypes[info.format])
      res.end(data)
    })

  }

  function configResolved (resolvedConfig) {
    cfg = resolvedConfig
  }

  async function buildStart () {

    if (cfg.command !== 'build') {
      return;
    }

    for await (const post of posts) {
      for await (const name of Object.keys(presets)) {

        console.log(`transforming: ${post.image} as ${name}`);

        const transformConfig = parseImageRequest(post.image, name);
        
        if (!transformConfig) {
          continue;
        }
        
        const { data, info, outPath } = await transformImage(transformConfig)

        if (!data) {
          return;
        }

        const referenceId = this.emitFile({
          type: 'asset',
          name: transformConfig.outPath.slice(1),
          fileName: transformConfig.outPath.slice(1),
          source: data
        });

      }
    }
  }

  function resolveId (id) {
    if (id === VIRTUAL_MODULE) {
      return RESOLVED;
    }
  }

  async function load (id) {
    if (id === RESOLVED) {
      console.log(id)
    }
  }

  function parseImageRequest (url, name) {
    const [inPath, query] = url.split('?')

    if (!fileRegex.test(inPath)) {
      return null
    }

    if (!name) {
      name = new URLSearchParams(query).get('p')
    }

    const preset = entries.get(name);

    if (!preset) {
      return null;
    }

    const { format } = preset 
    const outPath = getOutputPath(inPath, name, format)

    return ({
      format,
      url,
      inPath,
      outPath,
      preset,
      name,
      query,
    })
  }

  async function transformImage (transformConfig) {

    let inputBuffer;

    const { preset } = transformConfig;
    const inPath = resolve(basePath, `.${transformConfig.inPath}`)
    const outPath = resolve(baseUrl, `.${transformConfig.outPath}`)

    try {
      inputBuffer = await readFile(inPath)
    } catch (err) {
      console.warn(`Error Reading file: ${inPath}`)
      return {};
    }
 
    let sharpImage = sharp(inputBuffer)
    
    if (preset.resize) {
      sharpImage = sharpImage.resize(preset.resize)
    }

    if (preset.format) {
      sharpImage = await sharpImage.toFormat(preset.format, preset.options)
    }

    const { data, info } = await sharpImage.toBuffer({ resolveWithObject: true })
    
    return ({ data, info, outPath });
  }

  return ({
    name,
    enforce,
    buildStart,
    resolveId,
    configureServer,
    configResolved,
    load
  });

}

/**
 * 
 * @param {string} filePath - initial file path, without params 
 * @param {string} presetName - name of present defined in filepath params
 * @returns {string} output path
 */
function getOutputPath (filePath, presetName, format) {
  return filePath.replace(/(\.\w+)$/, `.${presetName}.${format}`);
}
