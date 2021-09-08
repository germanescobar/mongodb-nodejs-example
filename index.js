const mongoose = require('mongoose')
const faker = require('faker')
const User = require('./User')
const Post = require('./Post')

mongoose.connect('mongodb://localhost:27017/topv10', { useNewUrlParser: true })

mongoose.connection.on("error", function(e) { console.error(e) })

async function run() {
  try {
    // crear un documento
    for (let i=3000; i < 4000; i++) {
      const user = new User({ email: `user${i}@example.com`, password: "test1234", firstName: faker.name.firstName(), lastName: faker.name.lastName() })
      await user.save() // guarde en la base de datos

      const num = Math.floor(Math.random() * 1000) + 1
      const promises = []
      for (let j=0; j < num; j++) {
        promises.push(Post.create({ user: user, title: `Título ${j}`, content: faker.lorem.paragraphs(), tags: getRandomTags(3), date: faker.date.between('2015-01-01', '2021-09-01') }))
      }
      await Promise.all(promises)
    }
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

function getRandomTags(n) {
  const tags = ["mongodb", "code", "react", "bcrypt", "redux", "graphql", "postgres", "redis", "vscode", "javascript", "nextjs", "mongoose", "docker"]
  const shuffled = tags.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

run()