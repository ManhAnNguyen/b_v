import * as dotenv from 'dotenv';

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const HASH_PWD = +process.env.HASH_PWD;

export { SERVER_PORT, MONGODB_URI, HASH_PWD, ACCESS_TOKEN, REFRESH_TOKEN };
