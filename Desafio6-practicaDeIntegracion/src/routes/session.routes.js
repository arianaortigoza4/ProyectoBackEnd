const { Router } = require('express')
const {userModel} = require('../dao/models/users.model.js')

const router = Router()

router.post('/login', async (req, res)=>{
    console.log(req.body)
    const {email, password} = req.body
     console.log(email, password)
    // encripar la contraseña que viene del formulario, comparar con la encriptada de la base de datos
    const user = await userModel.findOne({email: email, password: password})


    if (!user) return res.status(401).send({status: 'error', message: 'Usuario o contraseña incorrectos'})
    
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email
    }

    res.status(200).send({
        status: 'success',
        payload: req.session.user,
        message: 'Login correcto',
        redirectTo: '/realtimeproducts?name=' + encodeURIComponent(req.session.user.name)
    })
})



router.post('/register', async (req, res)=>{ // con basae de datos
    const { first_name, last_name, email, password } = req.body

    // pregintar si existe el usuario
    const exists = await userModel.findOne({email})

    if (exists) return res.status(401).send({status: 'error', message: 'El usuario ya existe'})

    const user = {
        first_name,
        last_name,
        email,
        password
    }
    let result = await userModel.create(user)

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