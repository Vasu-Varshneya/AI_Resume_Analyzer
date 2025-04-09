
/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
      config.resolve.fallback = {
        canvas: false, // Prevents the import of `canvas` in the browser
        fs: false, // Ensures that filesystem modules are not bundled
        path: false, // Disables the `path` module from being required
      };
      return config;
    },
  };

export default nextConfig;
