import { testConnection } from './../test-utils/testConnection'
import { graphqlTestCall } from './../test-utils/graphqlTestCall'
import faker from 'faker'
import { UserModel } from './../models/UserModel'
// import { StoryModel } from './../models/StoryModel'

// Executes BEFORE all tests
beforeAll( async() => {
    testConnection()
})
// Executes AFTER all tests
afterAll(async() => { 
    UserModel.collection.drop()
    // StoryModel.collection.drop()
})

const signUpUserMutation = `
mutation signUpUser($userInput:UserInput!) {
    signUpUser(
        userInput: $userInput
    ) {
        isSuccess
        message
        result{
          name
          email
          avatar
          password
          token
        }
    }
  }
`

describe("Sign Up", () =>{
    it("create user", async() =>{
        const user = { 
            email:faker.internet.email(), 
            password:faker.internet.password(), 
            name:faker.name.firstName(),
            avatar:faker.image.avatar() 
        }

        const response = await graphqlTestCall({
            source: signUpUserMutation,
            variableValues:{
                userInput: user,
            }
        })
        expect(response.data!.signUpUser!.isSuccess).toBeTruthy()
        expect(response.data!.signUpUser!.message).toMatch("Success")
        expect(response.data!.signUpUser!.result.name).toMatch(user.name)
        expect(response.data!.signUpUser!.result.email).toMatch(user.email)
        expect(response.data!.signUpUser!.result.avatar).toMatch(user.avatar)
    })
})