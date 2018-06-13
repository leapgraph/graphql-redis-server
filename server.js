import express from 'express';
import bodyParser from 'body-parser';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import typeDefs from './schema';
import resolvers from './resolvers';
import { makeExecutableSchema } from "graphql-tools";
import Redis from "ioredis";

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const redis = new Redis()

const PORT = 4000;

const app = express();

// bodyParser is needed just for POST.
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema, context: {redis} }));

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))
app.listen(PORT);   