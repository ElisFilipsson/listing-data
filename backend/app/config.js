export const APP_PORT = process.env.PORT;
export const APP_HOST = process.env.HOST;
export const APP_PROTOCOL = process.env.PROTOCOL;
export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:7777";

export const dbConfig = {
  host: process.env.RDS_HOSTNAME,
  name: process.env.RDS_DBNAME,
  username: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
};
