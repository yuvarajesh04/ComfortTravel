import bcrypt from 'bcrypt'

export async function hashPassword(plainPassword:string): Promise<string> {
    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(plainPassword, salt)

    return hashedPassword
}

export async function comparePassword(password:string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword)
}