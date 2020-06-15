require("dotenv").config();

import { connectDatabase } from "./database/index";
import { ApolloServer } from "apollo-server-express";
import express, { Application } from "express";
import { typeDefs, resolvers } from "./graphql";

const mount = async (app: Application) => {
  const db = await connectDatabase();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({
      db,
    }),
  });
  server.applyMiddleware({ app, path: "/api" });

  app.listen(process.env.PORT);

  console.log(`[app]: http//localhost:${process.env.PORT}`);

  const dbRes = await db.listings.find({}).toArray();
  console.log(dbRes);
};

mount(express());
