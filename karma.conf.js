module.exports = (config) => {
  config.set({
    files: ['tests/**/*.ts'],
    browsers: ['PhantomJS'],
    frameworks: ['browserify', 'mocha'],
    reporters: ['mocha'],
    preprocessors: {
      'tests/**/*.ts': ['browserify']
    },
    browserify: {
      transform: [
        ['babelify', {extensions: ['.ts', '.tsx']}]
      ],
      plugin: [
        'tsify'
      ],
      extensions: ['.ts', '.tsx'],
      debug: true
    }
  })
}
