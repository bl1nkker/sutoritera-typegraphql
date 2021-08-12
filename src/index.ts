import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import mongoose from 'mongoose'
import { resolvers } from './resolvers'
import { typeDefs } from './typeDefs'
import { MyContext } from './types/MyContext'
import { authMiddleware } from './middleware/authMiddleware'
import { Server, Socket } from 'socket.io'
import { createServer } from 'http'
import cors from 'cors'

const main = async() =>{
    const app:any = express()
    app.use(authMiddleware)
    app.use(cors())
    
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req, res }: MyContext) => ({ req, res })
    })

    apolloServer.applyMiddleware({ app })
    await mongoose.connect('mongodb://localhost:27017/sutoritera-dev', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false});

    const server = createServer(app)
    const io = new Server(server);

    io.on('connection', (socket:Socket) => {
        console.log('a user connected');
        socket.on('disconnect', () => {
            console.log('a user disconnected')
        })
      });
    server.listen(4000, () => console.log('Server started on http://localhost:4000/graphql'))
}

main()