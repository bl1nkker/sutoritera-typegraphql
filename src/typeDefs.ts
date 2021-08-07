import { gql } from "apollo-server-express";

export const typeDefs = gql`
type User{
    id: ID!
    name: String
}
type Story{
    id: ID!
    title: String,
    content: String,
    interestedUsers:[ID!],
    creator: ID!,
    createdAt: String
}

input StoryInput{
    title: String,
    content: String
}

type OperationMessage{
    isSuccess: Boolean,
    message: String,
    result: Story
}

type Query {
    hello: String,
    getStories: [Story],
    getCreatedStories: [Story]
}
type Mutation{
    createStory(storyInput: StoryInput!): OperationMessage
    deleteStory(storyId: ID!): OperationMessage
    updateStory(storyInput: StoryInput!, storyId: ID!): OperationMessage
}
`;