import { defineConfig } from 'tsup'
import { resolve } from 'path'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'vue', '@mui/material', '@emotion/react', '@emotion/styled'],
  esbuildOptions(options) {
    options.jsx = 'automatic'
    options.loader = {
      ...options.loader,
      '.vue': 'jsx'
    }
    options.plugins = [
      {
        name: 'vue-loader',
        setup(build) {
          build.onLoad({ filter: /\.vue$/ }, async (args) => {
            const contents = await require('fs').promises.readFile(args.path, 'utf8')
            const { compileTemplate } = require('@vue/compiler-sfc')
            const { descriptor } = require('@vue/compiler-sfc').parse(contents)
            
            if (descriptor.template) {
              const { code } = compileTemplate({
                id: args.path,
                source: descriptor.template.content,
                filename: args.path,
                compilerOptions: {
                  mode: 'module'
                }
              })
              return {
                contents: code,
                loader: 'jsx'
              }
            }
            return {
              contents: descriptor.script?.content || '',
              loader: 'tsx'
            }
          })
        }
      }
    ]
  }
}) 