import vue from 'rollup-plugin-vue';
import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/DataTable.vue',
  output: [
    {
      file: 'dist/data-table.esm.js',
      format: 'esm'
    },
    {
      file: 'dist/data-table.umd.js',
      format: 'umd',
      name: 'VueDataTable'
    }
  ],
  plugins: [
    resolve(),
    commonjs(),
    vue({
      css: false,
      compileTemplate: true, // Assurez-vous que les templates sont compilés
    }),
    postcss({
      extract: true,
      minimize: true,
      use: ['sass'],
    })
  ],
  external: ['vue']
}
