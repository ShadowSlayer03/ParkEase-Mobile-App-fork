module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'], // Includes Expo Router support
    plugins: [
      "nativewind/babel",
      [
        "module-resolver",
        {
          alias: {
            "@/assets": "./assets",
          },
        },
      ],
    ],
  };
};
