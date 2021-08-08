import { createStory, deleteStory, getStories, interestedInStory, unInterestedInStory, updateStory } from './resolvers/storyResolver'
import { getCreatedStories } from './resolvers/userResolvers'
import { MyContext } from './types/MyContext'

export const resolvers = {
    Query: {
      hello: () => "helo",
      getStories: getStories,

      // User resolver
      getCreatedStories: getCreatedStories
    },
    Mutation:{
        // Story resolver
        // (parent, args, context, info)
        createStory: (_:any, args:any, ctx:MyContext) => createStory(ctx, args),
        deleteStory: (_:any, args:any, ctx:MyContext) => deleteStory(ctx, args),
        updateStory: (_:any, args:any, ctx:MyContext) => updateStory(ctx, args),
        interestedInStory: (_:any, args:any, ctx:MyContext) => interestedInStory(ctx, args),
        unInterestedInStory: (_:any, args:any, ctx:MyContext) => unInterestedInStory(ctx, args),


    }
  }