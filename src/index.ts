import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import mongoose from 'mongoose'
import { resolvers } from './resolvers'
import { typeDefs } from './typeDefs'

const main = async() =>{
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers
    })
    const app:any = express()
    apolloServer.applyMiddleware({ app })
    await mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
    app.listen(4000, () => console.log('Server started on http://localhost:4000/graphql'))
}

main()