import { testConnection } from './../test-utils/testConnection'
import { graphqlTestCall } from './../test-utils/graphqlTestCall'
import faker from 'faker'
import { UserModel } from './../models/UserModel'
import { signUpUserMutation } from './../test-utils/testQueries'
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



describe("Sign Up", () =>{
    const user = { 
        email:faker.internet.email(), 
        password:faker.internet.password(), 
        name:faker.name.firstName(),
        avatar:faker.image.avatar() 
    }
    it("create user", async() =>{
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
    it("check user in database", async() =>{
        // Check user in db
        const dbUser = await UserModel.findOne({ email: user.email })
        expect(dbUser).toBeDefined()
        // Expecting user to have firstName:user.firstName
        expect(dbUser!.name).toBe(user.name)
        expect(dbUser!.avatar).toBe(user.avatar)
    })
})