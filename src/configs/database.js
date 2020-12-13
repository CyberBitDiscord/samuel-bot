const { connection, connect, disconnect } = require('mongoose')

const { DB_URL, DB_USER, DB_PASS, DB_MAIN } = process.env

const MONGO_URI = `${DB_URL}${DB_USER}:${DB_PASS}${DB_MAIN}`

let database

exports.disconnectDB = () => {
    if (!database) {
      return
    }
    disconnect()
}

exports.connectDB = db => {
    const uri = `${MONGO_URI}/${db}?retryWrites=true&w=majority`
  
    if (database) {
      return
    }
  
    connect(uri, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
  
    database = connection
  
    database.once('open', async () => {
      console.log('Connected to database')
    })
  
    database.on('error', () => {
      console.log('Error connecting to database')
      return database
    })
}