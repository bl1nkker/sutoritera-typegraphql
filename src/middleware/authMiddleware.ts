import jwt from 'jsonwebtoken'

export const authMiddleware = async(req:any, _:any, next:any) => {
    try {
        // Here we get the token, from current user
        const token = req.headers?.authorization?.split(" ")[1]
        console.log('Request')
        console.log(req)
        // let decodedData
        // If token is created by our server
        if (token) {
            const decodedData:any = jwt.verify( token, 'sutoritera' )
            req.session = {
                userId: decodedData?.userId,
                isAuth: true
            }
        }
        next()
    } catch (error) {
        console.log(error)
        next()
    }
    
}