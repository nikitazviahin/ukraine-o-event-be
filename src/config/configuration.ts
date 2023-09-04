export default () => ({
  port: parseInt(process.env.PORT) || 3000,
  mongoDb: {
    uri: process.env.MONGO_URI,
  },
  jwtSecret: process.env.JWT_SECRET,
});
