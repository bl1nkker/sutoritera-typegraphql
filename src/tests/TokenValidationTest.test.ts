import { testConnection } from './../test-utils/testConnection'
import { graphqlTestCall } from './../test-utils/graphqlTestCall'
import faker from 'faker'
import { UserModel } from './../models/UserModel'
import { signInUserQuery, signUpUserMutation } from './../test-utils/testQueries'
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
describe("Token validation", () =>{
    const user = { 
        email:faker.internet.email(), 
        password:faker.internet.password(), 
        name:faker.name.firstName(),
        avatar:faker.image.avatar() 
    }
    it("the user receives a token after registration", async() =>{

        const response = await graphqlTestCall({
            source: signUpUserMutation,
            variableValues:{
                userInput: user,
            }
        })
        expect(response.data!.signUpUser!.isSuccess).toBeTruthy()
        expect(response.data!.signUpUser!.message).toMatch("Success")
        expect(response.data!.signUpUser!.result.token).toBeDefined()
    })
    it("the user receives a token after authorization", async() =>{
        const response = await graphqlTestCall({
            source: signInUserQuery,
            variableValues:{
                email: user.email,
                password: user.password
            }
        })
        expect(response.data!.signInUser!.isSuccess).toBeTruthy()
        expect(response.data!.signInUser!.message).toMatch("Success")
        expect(response.data!.signInUser!.result.token).toBeDefined()
    })
})