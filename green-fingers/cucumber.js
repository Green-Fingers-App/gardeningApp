module.exports = {
  default: `--format-options '{"snippetInterface": "synchronous"}'`
}

require('@babel/register')({
  presets: [
    'babel-preset-expo',
    '@babel/preset-react',
    '@babel/preset-typescript' // Only if using TypeScript
  ],
  extensions: ['.js', '.jsx', '.ts', '.tsx'] // Ensure it recognizes the necessary file extensions
});