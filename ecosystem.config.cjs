/**
 * Archivo de configuración de PM2 para ejecutar el bot y API en background.
 * Usa CommonJS (.cjs) para evitar conflictos con "type: module" del proyecto.
 *
 * Ajusta valores de env_* según tu despliegue.
 */

module.exports = {
  apps: [
    {
      name: 'steamid-guid-bot',
      script: './index.js',
      cwd: './',
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      autorestart: true,
      max_memory_restart: '300M',
      time: true,
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      env: {
        NODE_ENV: 'development',
        API_ACTIVE: 'true',
        API_PORT: '8000'
      },
      env_production: {
        NODE_ENV: 'production',
        API_ACTIVE: 'true',
        API_PORT: '8000'
      }
    }
  ]
};