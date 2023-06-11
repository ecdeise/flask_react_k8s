import configData from './config.json';

console.log(process.env.NODE_ENV);
const env = process.env.NODE_ENV || 'development';
const config = configData[env];
console.log(config);

export default config;
