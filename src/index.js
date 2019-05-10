import './env'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import mongoose from 'mongoose'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import { APP_PORT, IN_PROD, DB_USERNAME, DB_PASSWORD, DB_HOST } from './config'

mongoose
  .connect(`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}`, {
    useNewUrlParser: true,
  })
  .then(() => console.log('MongoDB Connected...'))

const app = express()
app.disable('x-powered-by')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: !IN_PROD,
})

server.applyMiddleware({ app })

app.listen({ port: 4000 }, () =>
  console.log(
    `Server started at http://localhost:${APP_PORT}${server.graphqlPath}`
  )
)
