import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag: string) => tag.startsWith('ultrathink-')
        }
      }
    }),
    dts({
      insertTypesEntry: true,
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      beforeWriteFile: (filePath, content) => ({
        filePath: filePath.replace(/src\//, ''),
        content
      })
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'UltraThinkSharedUI',
      fileName: (format) => `ultrathink-shared-ui.${format}.js`,
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'vue',
        '@mui/material',
        '@emotion/react',
        '@emotion/styled'
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          vue: 'Vue',
          '@mui/material': 'MaterialUI',
          '@emotion/react': 'EmotionReact',
          '@emotion/styled': 'EmotionStyled'
        }
      }
    },
    sourcemap: true,
    minify: false
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
}) 