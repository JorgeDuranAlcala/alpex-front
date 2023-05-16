/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

/** @type {import('next').NextConfig} */

// Remove this if you're not using Fullcalendar features
const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@fullcalendar/react',
  '@fullcalendar/daygrid',
  '@fullcalendar/list',
  '@fullcalendar/timegrid'
])

module.exports = withTM({
  trailingSlash: true,
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: '/public'
  },
  reactStrictMode: false,
  experimental: {
    esmExternals: false
  },
  swcMinify: false,
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    return config
  }
})
