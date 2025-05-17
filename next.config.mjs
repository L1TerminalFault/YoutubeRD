/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
      },
    ],
  },

  async headers() {
    return [
      {
        source: '/(.*)', // Match all routes
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'ALLOWALL', // Allows iframe embedding
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors *", // Allow any domain to embed
          },
        ],
      },
    ];
  },

  // webpack: (config, { dev }) => {
  //   if (dev) {
  //     config.watchOptions = {
  //       // Watch only ./src/components
  //       ignored: [
  //         '**/.next/**', // Ignore everything by default
  //         '**/node_modules/**', // Except this folder
  //         '**/public/**',
  //       ],
  //     };
  //   }
  //   return config;
  // },
};

export default nextConfig;
