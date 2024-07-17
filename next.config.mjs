/** @type {import('next').NextConfig} */
const nextConfig = {

    webpack: (config, { isServer }) => {
        // Preserve existing externals
        config.externals = [...config.externals, 'canvas', 'jsdom'];
    
        // Add a rule for ONNX files
        config.module.rules.push({
          test: /\.onnx$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                publicPath: '/_next/static/onnx/',
                outputPath: `${isServer ? '../' : ''}static/onnx/`,
              },
            },
          ],
        });
    
        return config;
      },
};

export default nextConfig;
