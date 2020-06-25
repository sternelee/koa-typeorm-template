import "reflect-metadata";
import * as Koa from "koa";
import * as Router from "koa-router";
import * as bodyParser from "koa-bodyparser";
import * as logger from "koa-logger";
import * as json from "koa-json";
import * as path from "path";
import * as koaStatic from "koa-static";
import * as koaSession from "koa-session";
import * as grant from "grant-koa";
import { createConnection } from "typeorm";
import { Server as WsServer } from "ws";
import { ApolloServer, gql } from "apollo-server-koa";
import AppRoutes from "./routes";
import messageSocket from "./message";
import grantConf from "./config/grant-conf";

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello world!",
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

// 使用 typeorm 连接数据库
createConnection()
  .then(async (connection) => {
    const app = new Koa();

    apolloServer.applyMiddleware({ app });

    app.keys = ["grant"];
    app.use(koaSession(app));
    app.use(grant(grantConf));

    const router = new Router();
    const port = process.env.PORT || 3006;

    //路由
    AppRoutes.forEach((route) =>
      router[route.method](route.path, route.action)
    );

    // 静态资源目录对于相对入口文件app.js的路径
    const staticPath = "../public";
    app.use(koaStatic(path.join(__dirname, staticPath)));

    // 中间件
    app.use(json());
    app.use(logger());
    app.use(bodyParser());
    app.use(router.routes());
    app.use(router.allowedMethods());
    let server = app.listen(port);
    const wss = new WsServer({
      server,
    });
    messageSocket(wss, app);
    console.log(
      `应用启动成功 端口:${port}, 而 graphql 运行在 ${apolloServer.graphqlPath}`
    );
  })
  .catch((error) => console.log("TypeORM connection error: ", error));
