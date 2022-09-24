const isPROD = process.env.NODE_ENV === 'production'

module.exports = {
  plugins: [
    isPROD && 'autoprefixer',
  ].filter(Boolean),
}
