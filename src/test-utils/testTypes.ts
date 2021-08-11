type User = {
    id: string,
    email: string,
    password: string,
    name: string,
    avatar: string,
    friendsList:[],
    createdStories:[],
    interestingStories:[],
    lastOnline: string,
    token: string
}
type Story = {
    id: string,
    title: string,
    content: string,
    interestedUsers:[],
    creator: string,
    createdAt: string
}

export type UserOperationMessage = {
    isSuccess: Boolean,
    message: string,
    result: User
}