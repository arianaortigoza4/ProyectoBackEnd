const { Router } = require('express')

const router = Router()


let users = [
    {id: 1, nombre: 'Federico', apellido: 'Osandón'},
    {id: 2, nombre: 'Juan', apellido: 'Perez'},
    {id: 3, nombre: 'Lucas', apellido: 'Martínes'},
]
// READ _____________________________________________________________________________
// get user -> solicita un usuario 
router.get('/:uid', (req, res)=>{
    const { uid } = req.params
    const user = users.find(user => user.id === Number(uid))

    // console.log(req.params)

    res.send(user)
}) 

// Endpint para solicitar todos los users GET http://localhost:8080/users ? limit=5
router.get('/users', (req, res)=>{  

    res.send(users)
}) // uid user id

// Create _____________________________________________________________________________
// crear un usuario
router.post('/', (req, res)=>{
    const {nombre, apellido} = req.body

    if (!nombre || !apellido) {
        return res.status(400).send({
            status: 'error',
            error: 'Faltan llenar campos en el formulario'
        })
    }
    const newUser = {
        id: users.length + 1,
        nombre: nombre,
        apellido: apellido
    }

    users.push(newUser)
    console.log(users)

    res.status(200).send({
        status: 'success',
        usersCreate: newUser
    })
}) //POST  http://localhost:8080/users

// update PUT PATCH _______________________________________________________________________

router.put('/:uid', (req, res)=>{
    const {uid} = req.params
    const {nombre, apellido} = req.body

    const userUpdateIndex = users.findIndex(user => user.id === parseInt(uid)) // 0 -> 

    users[userUpdateIndex] = { id: users[userUpdateIndex], nombre, apellido}
    console.log(users)

    res.status(200).send({
        status: 'success',
        message: 'Usuario actualizado'
    })
}) 

// DELETE 

router.delete('/:uid', (req, res)=>{
    const {uid} = req.params
    users = users.filter(user => user.id !== parseInt(uid))
    res.send(users)
})

module.exports = router