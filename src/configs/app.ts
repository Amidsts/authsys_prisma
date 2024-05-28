import cors from "cors";
import express, { Application, NextFunction, Response, Request } from "express";
import helmet from "helmet";

import { handleResponse } from "../utils/response";
import authRoutes from "../components/auth/routes"
import productRoutes from "../components/products/routes"

const app: Application = express();


export const initializeMiddlewares = () => {
  const allowedOrigins = [
    `http://localhost:5173`,
  ];

  const corsOptions = {
    origin: function (
      origin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void
    ) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  };

  app
    .use(cors(corsOptions))
    .use(express.json({ limit: "50kb" }))
    .use(express.urlencoded({ limit: "50kb", extended: false }))
    .use(helmet())
    .use((err: any, req: Request, res: Response, next: NextFunction) => {
      if (req.method === "OPTIONS") {
        res.header(
          "Access-Control-Allow-Methods",
          "POST, PUT, PATCH, GET, DELETE"
        );
        return handleResponse({
          res,
          status: 403,
          message: "Invalid header method",
        });
      }

      if (req.body && err instanceof SyntaxError) {
        return res.status(400).json({
          message: "Malformed JSON, check the body of the request",
        });
      }

      return next();
    })
};

export const initializeRoutes = () => {
  app.get("/", (req, res) => {
    res.json({ message: "welcome to app server" });
  });

  app
  .use("/auth", authRoutes)
  .use("/products", productRoutes)
  app.all("*", (_req, res: Response) =>
    handleResponse({
      res,
      status: 404,
      message: "You have used an invalid method or hit an invalid route",
    })
  );
};



export default app;
