// src/pages/controller.ts
// data.ts removed » so comment out...
// import { JsonController, Get, Param, Body, Put, Post, HttpCode } from 'routing-controllers'
// PageList being removed { Page, PageList } » that's not the Reader's solution
// remove data.ts! » so...
// import pagesById, { Page } from './data'

// Reader's solution » I'v created it by PageDatabes...
// in data.ts and exported it...
// same result, but not OK »
// because in my solution I do not use the type def...
// so I made the type to match the code AND!!!...
// not the code to match the type...

// @JsonController()
// export default class PageController {

// default behaviour » every request returns...
// a JSON » not necessary the .json()
// data.ts removed » so comment out...
// @Get('/pages/:id')
// getPage(
//   @Param('id') id: number
// ): Page {
//   return pagesById[id]
// }

// data.ts removed » so comment out...
// @Get('/pages')
// allPages(): PageList {
//   return { 
//     pages: Object.values(pagesById)
//   }
// }

// data.ts removed » so comment out...
// @Put('/pages/:id')
// updatePage(
//   @Param('id') id: number,
//   @Body() body: Partial<Page>
// ): Page {
//   console.log(`Incoming PUT body param:`, body)
//   return pagesById[id]
// }

// data.ts removed » so comment out...
// @Post('/pages')
// @HttpCode(201)
// createPage(
//   @Body() body: Page
// ): Page {
//   console.log(`Incoming POST body param:`, body)
//   return body
// }
import { JsonController, Get, Param, Put, Body, NotFoundError, Post, HttpCode } from 'routing-controllers'
import Page from './entity'

type PageList = { pages: Page[] }

@JsonController()
export default class PageController {

  @Get('/pages/:id')
  getPage(
    @Param('id') id: number
  ): Promise<Page | undefined> {
    return Page.findOne(id)
  }

  @Get('/pages')
  async allPages(): Promise<PageList> {
    const pages = await Page.find()
    return { pages }
  }

  @Put('/pages/:id')
  async updatePage(
    @Param('id') id: number,
    @Body() update: Partial<Page>
  ): Promise <Page | undefined> {
    const page = await Page.findOne(id)
    if (!page) throw new NotFoundError('Cannot find page')

    return Page.merge(page, update).save()
  }

  @Post('/pages')
  @HttpCode(201)
  createPage(
    @Body() page: Page
  ): Promise <Page> {
    return page.save()
  }
}