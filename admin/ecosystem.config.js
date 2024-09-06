module.exports = {
  apps: [
    {
      name: "directus",
      script: "./node_modules/directus/cli.js",
      args: ["start"],
    },
  ],
};
