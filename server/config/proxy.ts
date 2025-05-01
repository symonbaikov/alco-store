import { AxiosProxyConfig } from 'axios';

interface ProxyAuth {
  username: string;
  password: string;
}

export const proxyConfig: {
  host: string;
  port: number;
  auth?: ProxyAuth;
} = {
  host: process.env.PROXY_HOST || '',
  port: parseInt(process.env.PROXY_PORT || '8080', 10),
  auth: process.env.PROXY_AUTH && process.env.PROXY_USERNAME && process.env.PROXY_PASSWORD ? {
    username: process.env.PROXY_USERNAME,
    password: process.env.PROXY_PASSWORD
  } : undefined
}; 