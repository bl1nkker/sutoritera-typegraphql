import { createStory, getStories } from './resolvers/storyResolver'

export const resolvers = {
    Query: {
      hello: () => "helo",
      getStories: getStories
    },
    Mutation:{
        createStory: (_:any, params:any) => createStory(params)
    }
  }