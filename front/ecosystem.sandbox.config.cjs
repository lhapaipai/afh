module.exports = {
  apps: [
    {
      name: "front-sandbox",
      script: "./node_modules/next/dist/bin/next",
      args: ["start", "--port", "3005"],
    },
  ],
};
