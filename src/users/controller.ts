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
async createUser(
  @Body() user: User
): Promise <User>  {
  const {password, ...rest} = user
  const entity = User.create(rest)
  await entity.setPassword(password)
  return entity.save()
}
}