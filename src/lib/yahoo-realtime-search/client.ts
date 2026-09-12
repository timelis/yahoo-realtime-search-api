import type { KyInstance } from "ky";

import { SEARCH_BASE_URL, YAHOO_REALTIME_USER_AGENT } from "./consts.ts";
import type {
  GetAutoscrollParams,
  GetAutoscrollResponse,
  GetInterestCategoryPaginationParams,
  GetInterestCategoryPaginationResponse,
  GetRecommendPaginationParams,
  GetRecommendPaginationResponse,
  GetRecommendVideoParams,
  GetRecommendVideoResponse,
  GetSearchPaginationParams,
  GetSearchPaginationResponse,
} from "./types.ts";

class YahooSearch {
  private readonly instance: KyInstance;

  constructor(baseInstance: KyInstance) {
    this.instance = baseInstance.extend({
      headers: {
        "accept-language": "ja",
        "user-agent": YAHOO_REALTIME_USER_AGENT,
      },
      prefix: new URL(SEARCH_BASE_URL),
    });
  }

  // ============================================================
  // Recommend Pagination
  // ============================================================

  async getRecommendPagination(
    params: GetRecommendPaginationParams = {}
  ): Promise<GetRecommendPaginationResponse> {
    return await this.instance
      .get("realtime/api/v1/recommend/pagination", {
        searchParams: {
          ...(params.rkf !== undefined && { rkf: params.rkf }),
          ...(params.b !== undefined && { b: params.b }),
          ...(params.results !== undefined && { results: params.results }),
          ...(params.oldestTweetId !== undefined && {
            oldestTweetId: params.oldestTweetId,
          }),
        },
      })
      .json<GetRecommendPaginationResponse>();
  }

  // ============================================================
  // Autoscroll (Search)
  // ============================================================

  async getAutoscroll(
    params: GetAutoscrollParams
  ): Promise<GetAutoscrollResponse> {
    return await this.instance
      .get("realtime/api/v1/autoscroll", {
        searchParams: {
          p: params.p,
          ...(params.fr !== undefined && { fr: params.fr }),
          ...(params.rkf !== undefined && { rkf: params.rkf }),
          ...(params.b !== undefined && { b: params.b }),
          ...(params.latestTweetId !== undefined && {
            latestTweetId: params.latestTweetId,
          }),
          ...(params.results !== undefined && { results: params.results }),
          ...(params.catchupTweet !== undefined && {
            catchupTweet: params.catchupTweet,
          }),
        },
      })
      .json<GetAutoscrollResponse>();
  }

  // ============================================================
  // Search Pagination
  // ============================================================

  async getSearchPagination(
    params: GetSearchPaginationParams
  ): Promise<GetSearchPaginationResponse> {
    return await this.instance
      .get("realtime/api/v1/pagination", {
        searchParams: {
          p: params.p,
          ...(params.fr !== undefined && { fr: params.fr }),
          ...(params.rkf !== undefined && { rkf: params.rkf }),
          ...(params.b !== undefined && { b: params.b }),
          ...(params.oldestTweetId !== undefined && {
            oldestTweetId: params.oldestTweetId,
          }),
          ...(params.start !== undefined && { start: params.start }),
        },
      })
      .json<GetSearchPaginationResponse>();
  }

  // ============================================================
  // Recommend Video
  // ============================================================

  async getRecommendVideo(
    params: GetRecommendVideoParams = {}
  ): Promise<GetRecommendVideoResponse> {
    return await this.instance
      .get("realtime/api/v1/recommend/video", {
        searchParams: {
          ...(params.rkf !== undefined && { rkf: params.rkf }),
          ...(params.b !== undefined && { b: params.b }),
          ...(params.results !== undefined && { results: params.results }),
        },
      })
      .json<GetRecommendVideoResponse>();
  }

  // ============================================================
  // Interest Category Pagination
  // ============================================================

  async getInterestCategoryPagination(
    categoryId: string,
    params: GetInterestCategoryPaginationParams = {}
  ): Promise<GetInterestCategoryPaginationResponse> {
    return await this.instance
      .get(`realtime/api/v1/interest/category/pagination/${categoryId}`, {
        searchParams: {
          ...(params.oldestTweetId !== undefined && {
            oldestTweetId: params.oldestTweetId,
          }),
        },
      })
      .json<GetInterestCategoryPaginationResponse>();
  }
}

export { YahooSearch };
