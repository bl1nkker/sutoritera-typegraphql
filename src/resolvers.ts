import { createStory, deleteStory, getStories, interestedInStory, unInterestedInStory, updateStory } from './resolvers/storyResolver'
import { addUserToFriendsList, getCreatedStories, getUsers, removeUserFromFriendsList, signInUser, signUpUser } from './resolvers/userResolvers'
import { MyContext } from './types/MyContext'

export const resolvers = {
  Query: {
    getStories: getStories,

    // User resolver
    getUsers: getUsers,
    getCreatedStories: (_: any, __: any, ctx: MyContext) => getCreatedStories(ctx),
  },
  Mutation: {
    // User resolver
    signInUser: (_: any, args: any) => signInUser(args),
    signUpUser: (_: any, args: any) => signUpUser(args),
    addUserToFriendsList: (_: any, args: any, ctx: MyContext) => addUserToFriendsList(ctx, args),
    removeUserFromFriendsList: (_: any, args: any, ctx: MyContext) => removeUserFromFriendsList(ctx, args),

    // Story resolver
    // (parent, args, context, info)
    createStory: (_: any, args: any, ctx: MyContext) => createStory(ctx, args),
    deleteStory: (_: any, args: any, ctx: MyContext) => deleteStory(ctx, args),
    updateStory: (_: any, args: any, ctx: MyContext) => updateStory(ctx, args),
    interestedInStory: (_: any, args: any, ctx: MyContext) => interestedInStory(ctx, args),
    unInterestedInStory: (_: any, args: any, ctx: MyContext) => unInterestedInStory(ctx, args),


  }
}