import babel from 'rollup-plugin-babel'
import commonJs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'

const config = {
  entry: 'src/index.js',
  format: 'umd',
  moduleName: 'tinyscroll',
  plugins: [
    babel({ exclude: 'node_modules/**' }),
    commonJs(),
    nodeResolve()
  ]
}

if (process.env.NODE_ENV === 'production') {
  config.dest = 'dist/tinyscroll.min.js'
  config.plugins.push(uglify())
} else {
  config.dest = 'dist/tinyscroll.js'
}

export default config
