/** @type {import('next').NextConfig} */
const path = require('path');

module.exports = {
  // reactStrictMode: true,
  output: 'standalone',
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};
