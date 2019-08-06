// src/index.ts
import 'reflect-metadata'
import {createKoaServer} from 'routing-controllers'
import PageController from './pages/controller'
// for database
import setupDb from './db'
import UserController from './users/controller';

const port = process.env.PORT || 4000

const app = createKoaServer({
  controllers: [
    PageController,
    UserController
  ]
})

setupDb()
  .then(_ =>
    app.listen(port, () => console.log(`Listening on port ${port}`))
  )
  .catch(err => console.error(err))