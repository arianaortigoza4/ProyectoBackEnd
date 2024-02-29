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
    // console.log("user : " + user.admin)
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        admin: user.admin,
        email: user.email
    }

    // console.log("req.session.user.admin : " + req.session.user.admin)

    res.status(200).send({
        status: 'success',
        payload: req.session.user,
        message: 'Login correcto',
        redirectTo: '/realtimeproducts?name=' + encodeURIComponent(req.session.user.name) + '&admin=' + encodeURIComponent(req.session.user.admin)
    })
})



router.post('/register', async (req, res)=>{ // con basae de datos
    const { first_name, last_name, admin, email, password } = req.body


    let admin_bool = admin === 'on' ? true: false;

    // pregintar si existe el usuario
    const exists = await userModel.findOne({email})

    if (exists) return res.status(401).send({status: 'error', message: 'El usuario ya existe'})

    const user = {
        first_name,
        last_name,
        admin : admin_bool,
        email,
        password
    }
    console.log("creando el usuario")
    let result = await userModel.create(user)
    console.log("created")
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