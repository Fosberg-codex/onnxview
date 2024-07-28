import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {

  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  output: 'standalone',
  swcMinify: true,

  webpack: (config, { isServer }) => {
    // ONNX Runtime configuration
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
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'static/chunks/',
            publicPath: '_next/static/chunks/',
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;