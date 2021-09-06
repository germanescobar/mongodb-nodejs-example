const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/topv10', { useNewUrlParser: true })

mongoose.connection.on("error", function(e) { console.error(e) })

async function run() {
  // Schemas
  const userSchema = mongoose.Schema({
    email: {
      type: String,
      required: true
    },
    firstName: String,
    lastName: String
  })

  // Modelo
  const User = mongoose.model("User", userSchema)

  // crear un documento
  const user = new User({ email: "maria@example.com", firstName: "Maria", lastName: "Diaz" })
  await user.save() // guarde en la base de datos

  User.create()

  // listar documentos
  const results = await User.find()
  console.log(results)
}

run().then(() => {
  mongoose.disconnect()
})