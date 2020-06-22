require("dotenv").config();

import express, { Application } from "express";
<<<<<<< HEAD
import cookieParser from "cookie-parser";
=======
>>>>>>> cb637135c138cbaa0cece5399c0765e4c7e3f336
import { ApolloServer } from "apollo-server-express";
import { connectDatabase } from "./database";
import { typeDefs, resolvers } from "./graphql";

const mount = async (app: Application) => {
  const db = await connectDatabase();

  app.use(cookieParser(process.env.SECRET));

  const server = new ApolloServer({
    typeDefs,
    resolvers,
<<<<<<< HEAD
    context: ({ req, res }) => ({ db, req, res })
=======
    context: () => ({ db })
>>>>>>> cb637135c138cbaa0cece5399c0765e4c7e3f336
  });

  server.applyMiddleware({ app, path: "/api" });
  app.listen(process.env.PORT);

  console.log(`[app] : http://localhost:${process.env.PORT}`);
};

mount(express());
