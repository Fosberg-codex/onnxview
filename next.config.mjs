import path from 'path';
import { fileURLToPath } from 'url';
import CopyPlugin from 'copy-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {

//disable eslint and typescript errors
eslint: {
  ignoreDuringBuilds: true,
},
// typescript: {
//   ignoreBuildErrors: true,
// },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      };
    }
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      layers: true,
    };
    
    // Add CopyPlugin to copy WASM files
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: path.join(__dirname, 'public', 'wasm'),
            to: path.join(__dirname, '.next', 'static', 'wasm'),
          },
        ],
      })
    );

    return config;
  },
};

export default nextConfig;