export type Benefit = { benefit: string };

export interface Profile {
  profileId: string;
}

export interface Session {
  accountId: string;
  profileId: string;
  username?: string;
  activeProfile: Profile;
  profiles: Profile[];
  benefits: Benefit[];
  preferredSubtitleLanguageOption?: string;
  preferredAudioLanguageOption?: string;
}

export type PlaybackSession = Session;

export interface Metadata {
  originalAudioLanguage?: string;
  subtitleLanguageOptions?: string[];
  closedCaptionLanguageOptions?: string[];
  audioLanguageOptions?: string[];
  isSubtitled?: () => boolean;
  isDubbed?: () => boolean;
  publisher?: string;
  year?: string;
  episodeNumber?: string;
  duration?: number;
}

export interface PlayableCollection {
  id: string;
  title: string;
  type: string; // series, movie, season
  categories?: string[];
  description?: string;
  metadata?: Metadata;
  subCollections?: PlayableCollection[];
  content?: PlayableContent[];
  images: {
    portrait: string;
    landscape: string;
  };
  labels?: Label[];
  rating?: string;
}

export enum LabelType {
  NEW = "NEW",
  MATURE = "MATURE",
  PREMIUM = "PREMIUM",
  COMING_SOON = "COMING_SOON",
}

export interface Label {
  type: string;
}

export enum AvailabilityStatus {
  AVAILABLE = "AVAILABLE",
  PREMIUM_REQUIRED = "PREMIUM_REQUIRED",
  MATURE_RESTRICTED = "MATURE_RESTRICTED",
  COMING_SOON = "COMING_SOON",
}

export interface PlayableContent {
  type: string; // episode
  id: string;
  title: string;
  posterUrl?: string;
  collectionId?: string;
  rootCollectionTitle?: string;
  rootCollectionId?: string;
  description?: string;
  metadata?: Metadata;
  labels?: Label[];
  rating?: string;
  // getters
  getAvailabilityStatus(session: Session): AvailabilityStatus;
}

export type HomeFocusedPlayableContent = PlayableContent & {
  // hero, focusedCard
  homeType: string;
};

export type Playhead = {
  content: PlayableContent;
  fullyWatched?: boolean;
  playheadTime?: number;
  // getters
  getPercentageComplete: () => number;
  getDurationLeft: () => number;
};

export type History = Playhead[];

export type WatchlistPlayableContent = {
  content: PlayableContent;
  playhead: Playhead;
};

export type Watchlist = WatchlistPlayableContent[];
