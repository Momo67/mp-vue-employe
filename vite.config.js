import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import { createI18nPlugin } from '@yfwz100/vite-plugin-vue2-i18n'
import { VuetifyResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  define: {
    'process.env': process.env
  },
  build: {
    lib: {
      entry: 'src/components/Employe.vue',
      name: 'Employe',
      fileName: (format) => `Employe.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', 'tslib'],
      output: {
        globals: {
          vue: 'Vue',
          tslib: 'tslib'
        },
      },
    },
  },
  plugins: [
    createVuePlugin(/* options */),
    createI18nPlugin(),
    Components({
      resolvers: [
        VuetifyResolver(),
      ]
    })
  ],
})
