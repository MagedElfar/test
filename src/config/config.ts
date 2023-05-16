import { config } from "dotenv";
import path from "path"

config({
  path: path.join(path.dirname(__dirname), "..", ".env")
})

const conf = {
  port: parseInt(process.env.PORT!),

  mediaPath: path.join(path.dirname(__dirname), "..", "public", "media"),

  clientUrl: process.env.Client_URL,

  apiKey: process.env.API_KEY,

  axelor: {
    url: process.env.AXELOR_URL,
    username: process.env.AXELOR_USERNAME,
    password: process.env.AXELOR_PASSWORD
  },

  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  }
};

Object.freeze(conf);

export default conf;