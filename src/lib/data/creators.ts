export interface Creator {
  videoId: string        // YouTube video ID (the ?v= value)
  title: string          // video title
  creatorName: string    // display name of the creator
  channelUrl: string     // full YouTube channel URL
}

// Populate this array as creators join the community.
export const creators: Creator[] = []
