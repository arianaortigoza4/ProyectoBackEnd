const { Router } = require('express')
const {userModel} = require('../dao/models/users.model.js')
const { createHash, isValidPassword } = require('../utils/hashBcrypt')
const passport = require('passport')

const router = Router()

router.post('/login', passport.authenticate('login', {failureRedirect: '/api/sessions/faillogin'}) ,async (req, res)=>{
    if (!req.user) return res.status(401).send({status: 'error', error: 'creadential invalid'})
    req.session.user = {
        name: `${req.user.first_name} ${req.user.last_name}`,
        admin: req.user.admin,
        email: req.user.email
    }

    // console.log("req.session.user.admin : " + req.session.user.admin)

    res.status(200).send({
        status: 'success',
        payload: req.session.user,
        message: 'Login correcto',
        redirectTo: '/realtimeproducts?name=' + encodeURIComponent(req.session.user.name) + '&admin=' + encodeURIComponent(req.session.user.admin)
    })
})



router.post('/register', passport.authenticate('register', {failureRedirect: '/api/sessions/failregister'}) ,async (req, res)=>{
    res.status(200).json({
        status: 'success',
        message: 'Usuario creado correctamente'
    })
})

router.get('/logout', async (req, res)=>{
    // session.destroy()
    req.session.destroy(err => {
        if(err) return res.send({status:'Logout error', message: err})           
    })
    res.status(200).redirect('/login')
})

module.exports = router