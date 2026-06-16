module.exports = {
  apps: [
    {
      name: "bee2-convex",
      script: "npx",
      args: "convex dev --typecheck disable --tail-logs disable",
      env: {
        NODE_ENV: "development"
      }
    },
    {
      name: "bee2-web",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: "3001"
      }
    }
  ]
};
