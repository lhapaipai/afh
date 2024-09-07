module.exports = {
  apps: [
    {
      name: "front",
      script: "./node_modules/next/dist/bin/next",
      args: ["start", "--port", "3000"],
    },
  ],
};
