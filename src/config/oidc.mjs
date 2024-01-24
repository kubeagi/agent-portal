
export default {
  AUTH_DATA: 'authData',
  server: {
    url: process.env.OIDC_SERVER_URL,
  },
  client: {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: '/oidc/callback',
  },
};
