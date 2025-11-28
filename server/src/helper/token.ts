import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export async function signJwt(email: string, name: string): Promise<string> {
    if (!email || !name)
        return "Give email and name"

    let secretToken = process.env.JWT_SECRET;

    if (!secretToken) {
        console.warn('Secrect token not found in env')
        secretToken = "your_secret_token"
    }

    let token = jwt.sign({ email, name }, secretToken, {expiresIn: '10d'})

    return token
}