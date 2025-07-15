module.exports = {
  apps: [
    {
      name: 'homeseek',
      script: 'npx',
      args: 'vite preview --port 3006',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};

