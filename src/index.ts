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
// import cors from 'cors'
import { socketOnlineTracker } from './socketio/OnlineTracker'
import cookieParser from 'cookie-parser'

const main = async() =>{
    const app:any = express()
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser())
    app.use(authMiddleware)
    // app.use(cors({credentials: true, origin: "http://localhost:3000"}))

    // ApolloServer
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req, res }: MyContext) => ({ req, res })
    })
    // CORS overrides here by ApolloServer
    apolloServer.applyMiddleware({ app, cors:{ credentials:true, origin: "http://localhost:3000" } })

    // MongoDB
    await mongoose.connect('mongodb://localhost:27017/sutoritera-dev', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false});

    // SocketIO
    const server = createServer(app)
    const io = new Server(server);
    io.on('connection', (socket:Socket) => socketOnlineTracker(socket));

    server.listen(4000, () => console.log('Server started on http://localhost:4000/graphql'))
}

main()