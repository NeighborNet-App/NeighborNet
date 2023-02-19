export interface ItemLocation {
  latitude: number;
  longitude: number;
  streetAddress: string;
}

export default interface FeedItem {
  creationDate: number;
  title: string;
  description: string;
  authorId: string;
  imageURL?: string;
  address?: ItemLocation;
  eventTime?: number;
}
