import { gql } from "apollo-server-express";

export const typeDefs = gql`
type User{
    name: String
}
type Story{
    title: String,
    content: String,
    creator: User,
    createdAt: String
}

input StoryInput{
    title: String,
    content: String
}

type Query {
    hello: String,
    getStories: [Story]
}
type Mutation{
    createStory(storyInput: StoryInput!): Story
}
`;