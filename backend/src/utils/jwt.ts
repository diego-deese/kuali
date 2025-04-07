const jwt = require('jsonwebtoken')
const crypto = require('crypto')
import { SafeUser } from "../types/Users"

function generateAccessToken(user: SafeUser) {
    return jwt.sign( { institutionalEmail: user.institutional_email}, process.env.KEYPHRASE, {
        expiresIn: '15m'
    } )
}

function generateRefreshToken() {
    const token = crypto.randomBytes(16).toString('base64url')
    return token
}

function hashToken(token: String){
    return crypto.createHash('sha512').update(token).digest('hex')
}

function generateTokens(user: SafeUser) {
    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken()
    const hashedRefreshToken = hashToken(refreshToken)
    return { accessToken, refreshToken, hashedRefreshToken }
}

export { generateAccessToken, generateRefreshToken, generateTokens, hashToken }