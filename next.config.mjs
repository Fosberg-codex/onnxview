const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  webpack: (config, { isServer }) => {
    // ONNX Runtime configuration
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }

    config.externals.push({
      'onnxruntime-node': 'commonjs onnxruntime-node',
    });

    config.resolve.alias['onnxruntime-node'] = path.join(
      __dirname,
      'node_modules/onnxruntime-node'
    );

    // Add rule for .onnx files
    config.module.rules.push({
      test: /\.onnx$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/chunks/[name].[hash][ext]',
      },
    });

    return config;
  },
};

module.exports = nextConfig;