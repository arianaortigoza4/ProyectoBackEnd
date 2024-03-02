const passport = require('passport')
const local = require('passport-local')
const { userModel } = require('../dao/models/users.model') // accedemos al user model a travez del manager
const { createHash, isValidPassword } = require('../utils/hashBcrypt')

const LocalStrategy = local.Strategy

const initializePassport = () => {
    
    passport.use('register', new LocalStrategy({
        passReqToCallback: true, // accediendo al req
        usernameField: 'email'
    }, async (req, username, password, done) => {
        const {first_name, last_name, email,admin} = req.body
        try {
            let  user = await userModel.findOne({email})

            if (user) return done(null, false)   
            let admin_bool = admin === 'on' ? true: false;    

            let newUser = {
                first_name, 
                last_name,
                email,
                admin : admin_bool,
                password: createHash(password)
            }   

            let result = await userModel.create(newUser)
            // done funciona como el next
            return done(null, result)
        } catch (error) {
            return done(error)   
        }

    }))

    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async (username, password, done) => {
        console.log("User: " + username)
        try {
            const user = await userModel.findOne({email: username})
            console.log("User: " + user)
            if (!user) {
                console.log('user no encontrado')
                return done(null, false)
            }
            let result = isValidPassword(password, user.password);
            console.log("result: " + result)
            if (!result) return done(null, false)
            console.log('Password valido');
            return done(null, user)
        } catch (error) {
            console.log('error', error)
            return done(error)
        }
    }))


    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser(async (id, done) => {
        let user = await userModel.findById({_id: id})
        done(null, user)
    })
}

module.exports = {
    initializePassport
}