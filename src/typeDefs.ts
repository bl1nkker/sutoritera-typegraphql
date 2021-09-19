import { gql } from "apollo-server-express";

export const typeDefs = gql`
type User{
    id: ID
    email: String,
    password: String,
    name: String,
    avatar: String,
    friendsList:[ID!],
    createdStories:[ID!],
    interestingStories:[ID!],
    lastOnline: String,
    isOnline: Boolean,
    token: String
}
type Story{
    id: ID
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

input UserInput{
    email: String,
    password: String,
    name: String,
    avatar: String
}

type StoriesListOperationMessage{
    isSuccess: Boolean,
    message: String,
    result: [Story!]
}
type UsersListOperationMessage{
    isSuccess: Boolean,
    message: String,
    result: [User!]
}

type StoryOperationMessage{
    isSuccess: Boolean,
    message: String,
    result: Story
}
type UserOperationMessage{
    isSuccess: Boolean,
    message: String,
    result: User
}
type Query {
    getStories:StoriesListOperationMessage,
    getCreatedStories: StoriesListOperationMessage,
    getUsers:UsersListOperationMessage
}
type Mutation{
    createStory(storyInput: StoryInput!): StoryOperationMessage
    deleteStory(storyId: ID!): StoryOperationMessage
    updateStory(storyInput: StoryInput!, storyId: ID!): StoryOperationMessage
    interestedInStory(storyId: ID!): StoryOperationMessage
    unInterestedInStory(storyId: ID!): StoryOperationMessage

    signInUser(email:String, password:String): UserOperationMessage
    signUpUser(userInput:UserInput!): UserOperationMessage
    addUserToFriendsList(friendId: ID!):UserOperationMessage
    removeUserFromFriendsList(friendId: ID!):UserOperationMessage
}
`;