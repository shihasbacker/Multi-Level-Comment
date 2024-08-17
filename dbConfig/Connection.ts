import { DataSource } from "typeorm";
import dotnet from 'dotenv';
import * as entities from "../entities/Context";

dotnet.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: false,
    entities: entities
});