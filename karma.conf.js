module.exports = (config) => {
  config.set({
    files: ['tests/**/*.ts'],
    browsers: ['PhantomJS'],
    frameworks: ['browserify', 'mocha', 'chai', 'sinon'],
    reporters: ['mocha'],
    preprocessors: {
      'tests/**/*.ts': ['browserify']
    },
    browserify: {
      transform: [
        ['babelify', {extensions: ['.ts', '.tsx']}]
      ],
      plugin: [
        ['tsify', {target: 'es2015'}]
      ],
      extensions: ['.ts', '.tsx'],
      debug: true
    }
  })
}
