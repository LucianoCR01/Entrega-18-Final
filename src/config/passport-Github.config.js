import passport from "passport";
import GitHubStrategy from "passport-github2"
import UserModel from "../dao/models/user.model.js";

const initializePassportGitHub = () => {

    passport.use("github", new GitHubStrategy(
        {
            clientID: "Iv1.7e26381a97036a7a",
            clientSecret: "35a55cf8d63032da89ad4ea45011537a293299b1",
            callbackURL: "http://localhost:8080/githubcallback"
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log(profile)
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