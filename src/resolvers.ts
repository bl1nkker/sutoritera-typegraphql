import { createStory, deleteStory, getStories, interestedInStory, unInterestedInStory, updateStory } from './resolvers/storyResolver'
import { getCreatedStories, getUsers, signInUser, signUpUser } from './resolvers/userResolvers'
import { MyContext } from './types/MyContext'

export const resolvers = {
    Query: {
      getStories: getStories,

      // User resolver
      getUsers:getUsers,
      getCreatedStories: getCreatedStories,
      signInUser: (_:any, args:any) => signInUser(args),
    },
    Mutation:{
        // User resolver
        signUpUser: (_:any, args:any) => signUpUser(args),

        // Story resolver
        // (parent, args, context, info)
        createStory: (_:any, args:any, ctx:MyContext) => createStory(ctx, args),
        deleteStory: (_:any, args:any, ctx:MyContext) => deleteStory(ctx, args),
        updateStory: (_:any, args:any, ctx:MyContext) => updateStory(ctx, args),
        interestedInStory: (_:any, args:any, ctx:MyContext) => interestedInStory(ctx, args),
        unInterestedInStory: (_:any, args:any, ctx:MyContext) => unInterestedInStory(ctx, args),


    }
  }