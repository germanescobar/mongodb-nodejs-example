const mongoose = require('mongoose')
const User = require('./User')
const Post = require('./Post')

mongoose.connect('mongodb://localhost:27017/topv10', { useNewUrlParser: true })

mongoose.connection.on("error", function(e) { console.error(e) })

async function run() {
  try {
    // crear un documento
    const user = new User({ email: "david@example.com", password: "test1234", firstName: "David", lastName: "Rodriguez" })
    await user.save() // guarde en la base de datos

    /*await Post.create({ userId: "613233fb5f971766ecd37366", title: "Tercer post", content: "Contenido del tercer post",
    tags: ["mongodb", "code"]})*/

    // actualizar un documento

    // eliminar un documento
    /*const post = await Post.findOne({ _id: "61376fe376f579016904d9e7" })
    await post.remove()*/

    // await Post.deleteOne({ _id: "61376fe376f579016904d9e7" })

    // listar documentos
    // const results = await Post.find()
    // console.log(results)

    // const user = await User.authenticate("david@example.com", "testddd1234")
    // console.log("User: ", user)
  } catch (err) {
    if (err.name === "ValidationError") {
      console.log("Error de validación:", err.errors)
    } else {
      console.log(err)
    }
    
  } finally {
    mongoose.disconnect()
  }
  
}

run()