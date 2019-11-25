module.exports = {
  presets: ['@babel/preset-typescript', '@babel/preset-env'],
  plugins: [
    "@babel/plugin-transform-runtime",  // Fixes https://github.com/babel/babel/issues/5085
    [
      "babel-plugin-replace-require",
      {
        "meteor": "require('meteor-package-import')"
      }
    ]
  ]
}
