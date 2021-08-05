import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { buildSchema, Query, Resolver } from 'type-graphql'

@Resolver()
class SomeResolver{
    @Query(() => String)
    async getSomeData(){
        return "Hello world"
    }
}

const main = async() =>{
    const schema = await buildSchema({
        resolvers: [SomeResolver]
    })

    const apolloServer = new ApolloServer({schema})
    const app:any = express()
    apolloServer.applyMiddleware({ app })
    app.listen(4000, () => console.log('Server started on http://localhost:4000/graphql'))
}

main()