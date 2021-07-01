const path = require('path');
const babel = require('rollup-plugin-babel');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const uglify = require('rollup-plugin-uglify').uglify;
const merge = require('lodash.merge');
const pkg = require('./package.json');

const extensions = ['.js', '.ts'];

const resolve = function (...args) {
  return path.resolve(__dirname, ...args);
};

// 打包任务的个性化配置
const jobs = {
  esm: {
    output: {
      format: 'esm',
      file: resolve(pkg.module),
    },
  },
  umd: {
    output: {
      format: 'umd',
      file: resolve(pkg.main),
      name: 'rem',
    },
  },
  min: {
    output: {
      format: 'umd',
      file: resolve(pkg.main.replace(/(.\w+)$/, '.min$1')),
      name: 'rem',
    },
    plugins: [uglify()],
  },
};

// 从环境变量获取打包特征
const mergeConfig = jobs[process.env.FORMAT || 'esm'];

export default [
  {
    input: resolve('./src/index.ts'),
    output: {
      format: 'umd',
      file: resolve('dist/index.umd.js'),
      name: 'rem',
      globals: {
        "@babel/runtime/regenerator": "regeneratorRuntime"
      }
    },
    plugins: [
      nodeResolve({
        extensions,
        modulesOnly: true,
      }),
      babel({
        exclude: 'node_modules/**',
        extensions,
        runtimeHelpers: true,
        plugins: [
          "@babel/plugin-transform-async-to-generator",
          "@babel/plugin-transform-regenerator",
          ["@babel/plugin-transform-runtime", {
            "helpers": true,
            "regenerator": true
          }]
        ],
      }),
    ],
  }, {
    input: resolve('./src/timMain.ts'),
    output: {
      format: 'umd',
      file: resolve('dist/timMain.umd.js'),
      name: 'rem',
      globals: {
        "@babel/runtime/regenerator": "regeneratorRuntime"
      }
    },
    plugins: [
      nodeResolve({
        extensions,
        modulesOnly: true,
      }),
      babel({
        exclude: 'node_modules/**',
        extensions,
        runtimeHelpers: true,
        plugins: [
          "@babel/plugin-transform-async-to-generator",
          "@babel/plugin-transform-regenerator",
          ["@babel/plugin-transform-runtime", {
            "helpers": true,
            "regenerator": true
          }]
        ],
      }),
    ],
  },{
    input: resolve('./src/timRender.ts'),
    output: {
      format: 'umd',
      file: resolve('dist/timRender.umd.js'),
      name: 'rem',
      globals: {
        "@babel/runtime/regenerator": "regeneratorRuntime"
      }
    },
    plugins: [
      nodeResolve({
        extensions,
        modulesOnly: true,
      }),
      babel({
        exclude: 'node_modules/**',
        extensions,
        runtimeHelpers: true,
        plugins: [
          "@babel/plugin-transform-async-to-generator",
          "@babel/plugin-transform-regenerator",
          ["@babel/plugin-transform-runtime", {
            "helpers": true,
            "regenerator": true
          }]
        ],
      }),
    ],
  }]