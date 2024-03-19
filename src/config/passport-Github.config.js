import passport from "passport";
import GitHubStrategy from "passport-github2"
import UserModel from "../dao/mongo/models/user.model.js";
import dotenv from "dotenv"
dotenv.config()

const clientID = process.env.clientID
const clientSecret = process.env.clientSecret

const initializePassportGitHub = () => {

    passport.use("github", new GitHubStrategy(
        {
            clientID: clientID,
            clientSecret: clientSecret,
            callbackURL: "http://localhost:8080/githubcallback"
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const user = await UserModel.findOne({ email: profile._json.email })
                if (user) {
                    console.log("User already exits")
                    return done(null, user)
                }
                const newUser = {
                    first_name: profile._json.name,
                    last_name: "",
                    email: profile._json.email,
                    password: ""
                }
                const result = await UserModel.create(newUser)
                return done(null, result)
            } catch (error) {
                return done("error to login with github " + error)
            }
        }
    ))
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser(async (id, done) => {
        const user = await UserModel.findById(id)
        done(null, user)
    })
}

export default initializePassportGitHub