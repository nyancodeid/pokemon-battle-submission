const presets = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage",
        corejs: "3.25.1",
      },
    ],
  ],
  plugins: [],
};

module.exports = { ...presets };
