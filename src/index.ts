import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import ky from 'ky'
import { z } from 'zod'
import { YahooSearch } from './lib/yahoo-realtime-search'

const app = new Hono()
const yahoo = new YahooSearch(ky)
const pagination = z.strictObject({
  rkf: z.number().optional(),
  b: z.number().optional(),
  results: z.number().optional(),
})

app.post('/recommend/pagination', zValidator('json', pagination.extend({
  oldestTweetId: z.string().optional(),
})), async (c) => c.json(await yahoo.getRecommendPagination(c.req.valid('json'))))

app.post('/autoscroll', zValidator('json', pagination.extend({
  p: z.string(),
  fr: z.string().optional(),
  latestTweetId: z.string().optional(),
  catchupTweet: z.boolean().optional(),
})), async (c) => c.json(await yahoo.getAutoscroll(c.req.valid('json'))))

app.post('/pagination', zValidator('json', pagination.omit({ results: true }).extend({
  p: z.string(),
  fr: z.string().optional(),
  oldestTweetId: z.string().optional(),
  start: z.string().optional(),
})), async (c) => c.json(await yahoo.getSearchPagination(c.req.valid('json'))))

app.post('/recommend/video', zValidator('json', pagination),
  async (c) => c.json(await yahoo.getRecommendVideo(c.req.valid('json'))))

app.post('/interest/category/pagination/:categoryId',
  zValidator('param', z.object({ categoryId: z.string() })),
  zValidator('json', z.strictObject({ oldestTweetId: z.string().optional() })),
  async (c) => c.json(await yahoo.getInterestCategoryPagination(
    c.req.valid('param').categoryId, c.req.valid('json'))))

export default app
