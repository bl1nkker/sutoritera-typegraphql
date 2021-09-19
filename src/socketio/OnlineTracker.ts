import { Socket } from "socket.io"
import { UserModel } from "./../models/UserModel"

export const socketOnlineTracker = async(socket:Socket) => {
    const { userId } = await socket.handshake.query
    const currentUser = await UserModel.findById(userId)

    if (!currentUser) throw new Error("There are no such user!")
    
    currentUser.isOnline = true
    // const result = await UserModel.findByIdAndUpdate(userId, currentUser, { new:true })
    await UserModel.findByIdAndUpdate(userId, currentUser, { new:true })
    // console.log('a user connected', result);
    socket.on('disconnect', async() => {
        currentUser.isOnline = false
        currentUser.lastOnline = new Date().toLocaleString()
        // const result = await UserModel.findByIdAndUpdate(userId, currentUser, { new:true })
        await UserModel.findByIdAndUpdate(userId, currentUser, { new:true })
        // console.log('a user disconnected', result);
    })
  }