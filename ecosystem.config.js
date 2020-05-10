module.exports = {
  apps : [{
    name: 'Sale_Server',
    script: 'bin/www',

    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env_development: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};
