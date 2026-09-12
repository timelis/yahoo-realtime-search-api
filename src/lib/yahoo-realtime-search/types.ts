// ============================================================
// Common Types
// ============================================================

export interface TimelineHead {
  totalResultsAvailable: number;
  totalResultsReturned: number;
}

export interface TimelineResponse<E> {
  timeline: {
    head: TimelineHead;
    entry: E[];
    mediaTweet?: boolean;
  };
}

export interface Badge {
  show: boolean;
  type: string;
  color: string;
}

export interface TweetUrlEntity {
  displayUrl: string;
  expandedUrl: string;
  url: string;
  indices: [number, number];
}

export interface HashtagEntity {
  text: string;
  indices: [number, number];
}

export interface MediaImageSizes {
  viewer: {
    width: number;
    height: number;
  };
}

export interface MediaItem {
  url: string;
  displayUrl: string;
  mediaUrl: string;
  sizes: MediaImageSizes;
  thumbnailImageUrl: string;
  duration?: number;
}

export interface TweetMedia {
  type: string;
  item: MediaItem;
  metaImageUrl: string;
}

// ============================================================
// Recommend Pagination (recommend/pagination)
// ============================================================

export interface RecommendAuthor {
  name: string;
  screenName: string;
  screenNameUrl: string;
  image: string;
  imageUrl: string;
  id: string;
  followersCount: number;
}

export interface RecommendEntry {
  id: string;
  url: string;
  idUrl: string;
  author: RecommendAuthor;
  body: string;
  imageUrl: string;
  reply: number;
  rt: number;
  like: number;
  qt: number;
  replyUrl: string;
  rtUrl: string;
  likesUrl: string;
  time: string;
  mediaType: string;
  imgPage: string;
  pos: string;
  tweetMedia: TweetMedia[];
  badge: Badge;
  createdAt: number;
  tweetThemeNormal: string[];
  timelineId: string;
  sentimentAlt: number;
  sentimentScore: number;
  emotion: number;
  videoClassifyIdList: unknown[] | null;
  imageClassifyIdList: unknown[] | null;
  verifiedType: string;
  reliable: boolean;
  himaNetaRecommend: boolean;
  tweetThemeCategory: string[];
  keyword: string | null;
}

export interface GetRecommendPaginationParams {
  rkf?: number;
  b?: number;
  results?: number;
  oldestTweetId?: string;
}

export type GetRecommendPaginationResponse = TimelineResponse<RecommendEntry>;

// ============================================================
// Autoscroll (search)
// ============================================================

export interface SearchEntry {
  id: string;
  url: string;
  detailUrl: string;
  detailQuoteUrl?: string;
  badge: Badge;
  displayText: string;
  displayTextBody: string;
  displayTextFragments: string;
  displayTextEntities: string;
  urls: TweetUrlEntity[];
  hashtags: HashtagEntity[];
  hashtagUrls: Record<string, string>;
  mentions: unknown[];
  mentionUrls: Record<string, string>;
  replyMentions: unknown[];
  replyMentionUrls: Record<string, string>;
  createdAt: number;
  replyCount: number;
  replyUrl: string;
  rtCount: number;
  rtUrl: string;
  qtCount: number;
  likesCount: number;
  likesUrl: string;
  userId: string;
  userUrl: string;
  name: string;
  screenName: string;
  profileImage: string;
  mediaType: string[];
  media: TweetMedia[];
  possiblySensitive: boolean;
  tweetThemeNormal: string[];
  userThemeNormal: string[];
  twitterContextID: unknown[];
  videoClassifyId: unknown[];
  inReplyTo: string;
}

export interface GetAutoscrollParams {
  fr?: string;
  p: string;
  rkf?: number;
  b?: number;
  latestTweetId?: string;
  results?: number;
  catchupTweet?: boolean;
}

export type GetAutoscrollResponse = TimelineResponse<SearchEntry>;

// ============================================================
// Search Pagination (pagination)
// ============================================================

export interface GetSearchPaginationParams {
  p: string;
  fr?: string;
  rkf?: number;
  b?: number;
  oldestTweetId?: string;
  start?: string;
}

export type GetSearchPaginationResponse = TimelineResponse<SearchEntry>;

// ============================================================
// Recommend Video
// ============================================================

export interface GetRecommendVideoParams {
  rkf?: number;
  b?: number;
  results?: number;
}

export type GetRecommendVideoResponse = TimelineResponse<SearchEntry>;

// ============================================================
// Interest Category Pagination
// ============================================================

export interface QuotedTweet {
  id: string;
  url: string;
  detailUrl: string;
  badge: Badge;
  displayTextBody: string;
  urls: TweetUrlEntity[];
  replyMentions: unknown[];
  replyMentionUrls: Record<string, string>;
  createdAt: number;
  userId: string;
  name: string;
  screenName: string;
  profileImage: string;
  userUrl: string;
  media: TweetMedia[];
}

export type InterestCategoryEntry = SearchEntry & {
  quotedTweet?: QuotedTweet;
  categoryFandomTweetTheme?: unknown[];
};

export interface GetInterestCategoryPaginationParams {
  oldestTweetId?: string;
}

export type GetInterestCategoryPaginationResponse =
  TimelineResponse<InterestCategoryEntry>;
