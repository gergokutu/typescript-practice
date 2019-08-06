import { JsonController, Get, Param, Put, Body, NotFoundError, Post, HttpCode } from 'routing-controllers'
import User from './entity'

type UserList = { users: User[] }

@JsonController()
export default class UserController {

  @Get('/Users/:id')
  getUser(
    @Param('id') id: number
  ): Promise<User | undefined> {
    return User.findOne(id)
  }

  @Get('/users')
  async allUsers(): Promise<UserList> {
    const users = await User.find()
    return { users }
  }

  @Put('/users/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() update: Partial<User>
  ): Promise <User | undefined> {
    const page = await User.findOne(id)
    if (!page) throw new NotFoundError('Cannot find page')

    return User.merge(page, update).save()
  }

  @Post('/users')
  @HttpCode(201)
  createUser(
    @Body() page: User
  ): Promise <User> {
    return page.save()
  }
}