import { StoryModel } from './../models/StoryModel'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { UserModel } from './../models/UserModel'

type UserType = {
    id: string,
    email: string,
    password: string,
    name: string,
    avatar: string,
    friendsList:string[],
    createdStories:string[],
    interestingStories:string[],
    lastOnline: string,
    token: string
}

export const getUsers = async() =>{
    try {
        return UserModel.find()
    } catch (error) {
        console.log(error)
        return { isSuccess: false, message:"Problems encountered during fetching users", result:null }
    }
}

export const signUpUser = async(args:any) =>{
    const userCredentials = {...args.userInput}
    try {
        const existingUser:UserType = await UserModel.findOne({ email:userCredentials.email })
        if (existingUser) return { isSuccess: false, message:'User with such email already exists', result: null }

        const hashedPassword = await bcrypt.hash(userCredentials.password, 12)
        const newUser = new UserModel({ ...userCredentials, password:hashedPassword })
        const result = await newUser.save()
        const token = jwt.sign({ userId:newUser._id, email:newUser.email }, 'sutoritera', { expiresIn: '7d' })
        result.token = token
        return { isSuccess: true, message:'Success', result:result }
    } catch (error) {
        console.log(error)
        return { isSuccess: false, message:"Problems encountered during registration", result:null }
    }
} 

export const signInUser = async(args:any) =>{
    try {
        const { email, password } = args
        const existingUser:UserType = await UserModel.findOne({ email:email })
        if (!existingUser) return { isSuccess: false, message:'User with such email does not exists', result: null }

        const passwordIsCorrect = await bcrypt.compare(password, existingUser.password)
        if (!passwordIsCorrect) return { isSuccess: false, message:'Password do not match!', result: null }

        const token = jwt.sign({ userId:existingUser.id, email:existingUser.email }, 'sutoritera', { expiresIn: '7d' })
        existingUser.token = token
        return { isSuccess: true, message:'Success', result:existingUser }
    } catch (error) {
        console.log(error)
        return { isSuccess: false, message:'Problems encountered during signing in', result:null }
    }
}

// export const addFriendToFriendsList = async(ctx:MyContext, args:any) =>{
//     if (!ctx){

//     }
// }

export const getCreatedStories = async() =>{
    // Get created ID
    return StoryModel.find({ creator: "536f6d652075736572204944" })
}