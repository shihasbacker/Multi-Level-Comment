import express, { Request, Response } from "express";
import dotnet from "dotenv";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import { AppDataSource } from "./dbConfig/Connection";

dotnet.config();

const app = express();
const port: number = parseInt(process.env.PORT as string, 10) || 3000;

const swaggerOptions = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "The Alter Office",
      version: "0.0.1",
      description: "Task: Node.js",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./routes/*.ts"],
};

const specs = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:4000",
      "http://localhost:5000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

app.listen(port, () => {
  console.log("server is running " + port);
  AppDataSource.initialize().catch((error) => console.log(error));
});
