const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

function initialize(passport, getUserByEmail, getUserById) {
    console.log("Initializing Passport middleware");
    const authenticateUser = async (email, password, done) => {
        const user = getUserByEmail(email);
        if (!user) {
            console.log("No email", email)
            return done(null, false, { message: "No user with that email" });
        }

        try {
            if (password === user.password) {
                return done(null, user);
            } else {
                console.log("Password incorrect for user:", user);
                return done(null, false, { message: "Password incorrect" });
            }
        } catch (error) {
            console.error("Error during authentication:", error);
            return done(error);
        }
    };

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
    passport.serializeUser((user, done) => {
        done(null, user.id)
    });
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id));
    });
}

module.exports = initialize;
