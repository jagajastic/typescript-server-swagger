export const config = {
  secrets: {
    jwt: process.env.JWT_TOKEN_SECRET,
  },
  dbUrl: process.env.MONGO_URL_PROD,
};
