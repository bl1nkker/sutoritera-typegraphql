export const signUpUserMutation = `
mutation signUpUser($userInput:UserInput!) {
    signUpUser(
        userInput: $userInput
    ) {
        isSuccess
        message
        result{
            id
          name
          email
          avatar
          password
          token
        }
    }
  }
`

export const signInUserQuery = `
query signInUser($email:String!, $password:String){
    signInUser(email:$email, password:$password){
        isSuccess
        message
        result{
          id
          name
          email
          avatar
          password
          token
        }
    }
  }
`

export const createStoryMutation = `
mutation createStory($storyInput: StoryInput!){
    createStory(storyInput:$storyInput){
      isSuccess
      message
      result{
        id
        creator
        title
        content
      }
    }
  }
`

export const updateStoryMutation = `
mutation updateStory($storyInput: StoryInput!, $storyId: ID!){
    updateStory(storyInput:$storyInput, storyId:$storyId){
      isSuccess
      message
      result{
        id
        creator
        title
        content
      }
    }
  }
`

export const deleteStoryMutation = `
mutation deleteStory($storyId: ID!){
    deleteStory(storyId:$storyId){
      isSuccess
      message
      result{
        id
        creator
        title
        content
      }
    }
  }
`
export const interestedInStoryMutation = `
mutation interestedInStory($storyId: ID!){
    interestedInStory(storyId:$storyId){
      isSuccess
      message
      result{
        id
        creator
        title
        content
        interestedUsers
      }
    }
  }`
export const unInterestedInStoryMutation = `
mutation unInterestedInStory($storyId: ID!){
    unInterestedInStory(storyId:$storyId){
      isSuccess
      message
      result{
        id
        creator
        title
        content
        interestedUsers
      }
    }
  }`