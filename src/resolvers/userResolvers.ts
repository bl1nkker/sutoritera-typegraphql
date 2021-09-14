import { StoryModel } from './../models/StoryModel'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { UserModel } from './../models/UserModel'
import { MyContext } from 'src/types/MyContext'

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

export const getCreatedStories = async(ctx:MyContext) =>{
    // Get created ID
    try {
        const { userId } = ctx.req.session
        const result = await StoryModel.find({ creator: userId })
        return { isSuccess: true, message:'Success', result }
    } catch (error) {
        console.log(error)
        return { isSuccess: false, message:"Problems encountered during fetching user stories", result:null }
    }
}

export const getUsers = async() =>{
    try {
        const result = await UserModel.find()
        return { isSuccess: true, message:'Success', result }
    } catch (error) {
        console.log(error)
        return { isSuccess: false, message:"Problems encountered during fetching users", result:null }
    }
}

export const signUpUser = async(args:any, ctx:MyContext) =>{
    const userCredentials = {...args.userInput}
    try {
        const existingUser:UserType = await UserModel.findOne({ email:userCredentials.email })
        if (existingUser) return { isSuccess: false, message:'User with such email already exists', result: null }

        const hashedPassword = await bcrypt.hash(userCredentials.password, 12)
        const newUser = new UserModel({ ...userCredentials, password:hashedPassword })
        const result = await newUser.save()
        const token = jwt.sign({ userId:newUser._id, email:newUser.email }, 'sutoritera', { expiresIn: '7d' })
        ctx.res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'production',
            maxAge: 1000 * 60 * 60 * 24 * 7
        })
        return { isSuccess: true, message:'Success', result:result }
    } catch (error) {
        console.log(error)
        return { isSuccess: false, message:"Problems encountered during registration", result:null }
    }
} 

export const signInUser = async(args:any, ctx:MyContext) =>{
    try {
        const { email, password } = args
        const existingUser:UserType = await UserModel.findOne({ email:email })
        if (!existingUser) return { isSuccess: false, message:'User with such email does not exists', result: null }

        const passwordIsCorrect = await bcrypt.compare(password, existingUser.password)
        if (!passwordIsCorrect) return { isSuccess: false, message:'Password do not match!', result: null }

        const token = jwt.sign({ userId:existingUser.id, email:existingUser.email }, 'sutoritera', { expiresIn: '7d' })
        ctx.res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'production',
            maxAge: 1000 * 60 * 60 * 24 * 7
        })
        ctx.res.cookie("uid", existingUser.id, {
            httpOnly: false,
            secure: process.env.NODE_ENV !== 'production',
            maxAge: 1000 * 60 * 60 * 24 * 7
        })
        return { isSuccess: true, message:'Success', result:existingUser }
    } catch (error) {
        console.log(error)
        return { isSuccess: false, message:'Problems encountered during signing in', result:null }
    }
}

export const addUserToFriendsList = async(ctx:MyContext, args:any) =>{
    if (!ctx.req.session?.isAuth){
        return { isSuccess: false, message: 'Not authenticated', result:null }
    }
    try {
        const { friendId } = args
        const { userId } = ctx.req.session
        const currentUser:UserType = await UserModel.findById(userId)
        const friendUser:UserType = await UserModel.findById(friendId)
        if (currentUser && friendUser){
            if (currentUser.friendsList.indexOf(friendId) !== -1) return { isSuccess: false, message: `${friendUser.name} is already in friends list`, result: null }
    
            currentUser.friendsList.push(friendId)
            const result = await UserModel.findByIdAndUpdate(userId, {...currentUser}, { new:true })
            return { isSuccess: true, message: 'Success', result: result}
        }
        return { isSuccess: false, message: 'User not found', result: null }
    } catch (error) {
        console.log(error)
        return { isSuccess: false, message:error, result:null }
    }
} 

export const removeUserFromFriendsList = async(ctx:MyContext, args:any) =>{
    if (!ctx.req.session?.isAuth){
        return { isSuccess: false, message: 'Not authenticated', result:null }
    }
    try {
        const { friendId } = args
        const { userId } = ctx.req.session
        const currentUser:UserType = await UserModel.findById(userId)
        const friendUser:UserType = await UserModel.findById(friendId)
        if (currentUser && friendUser){
            if (currentUser.friendsList.indexOf(friendId) === -1) return { isSuccess: false, message: `${friendUser.name} is not in friends list`, result: null }    
            currentUser.friendsList = currentUser.friendsList.filter( _id => _id !== friendId )
            const result = await UserModel.findByIdAndUpdate(userId, {...currentUser}, { new:true })
            return { isSuccess: true, message: 'Success', result: result }
        }
        return { isSuccess: false, message: 'User not found', result: null }
    } catch (error) {
        console.log(error)
        return { isSuccess: false, message:error, result:null }
    }
} 


