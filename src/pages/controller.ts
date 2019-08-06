// src/pages/controller.ts
import { JsonController, Get, Param, Put, Body, Post, HttpCode } from 'routing-controllers'
// PageList being removed { Page, PageList } » that's not the Reader's solution
import pagesById, { Page } from './data'

// Reader's solution » I'v created it by PageDatabes...
// in data.ts and exported it...
// same result, but not OK »
// because in my solution I do not use the type def...
// so I made the type to match the code AND!!!...
// not the code to match the type...
type PageList = { pages: Page[] }
@JsonController()
export default class PageController {

  // default behaviour » every request returns...
  // a JSON » not necessary the .json()
  @Get('/pages/:id')
  getPage(
    @Param('id') id: number
  ): Page {
    return pagesById[id]
  }
  
  @Get('/pages')
  allPages(): PageList {
    return { 
      pages: Object.values(pagesById)
    }
  }

  @Put('/pages/:id')
  updatePage(
    @Param('id') id: number,
    @Body() body: Partial<Page>
  ): Page {
    console.log(`Incoming PUT body param:`, body)
    return pagesById[id]
  }

  @Post('/pages')
  @HttpCode(201)
  createPage(
    @Body() body: Page
  ): Page {
    console.log(`Incoming POST body param:`, body)
    return body
  }

}