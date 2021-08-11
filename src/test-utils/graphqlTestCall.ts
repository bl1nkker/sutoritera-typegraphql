import { graphql } from 'graphql'
import { makeExecutableSchema } from 'graphql-tools'

import { typeDefs } from './../typeDefs'
import { resolvers } from './../resolvers'
import { Maybe } from 'graphql/jsutils/Maybe'

const schema = makeExecutableSchema({ typeDefs, resolvers })

interface Options {
    source: string,
    variableValues?:Maybe<{[key: string]: any;}>,
    userId?: number,
    isAuth?: boolean,
    token?: string
}

export const graphqlTestCall = async({ source, variableValues, userId, isAuth }:Options) =>{
    // It requires "source", because it's "graphql" here
    return graphql({
        // Schema where we will call our resolvers
        schema,
        // Actually resolver, that we will call
        source,
        // Some variables
        variableValues,
        contextValue:{
            req:{
                session:{
                    userId,
                    isAuth
                }
            },
            res:{}
        }
    })
}