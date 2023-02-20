import User from "./User";

export interface ItemLocation {
  latitude: number;
  longitude: number;
  streetAddress: string;
  city: string;
  country: string;
}

export default interface FeedItem {
  creationDate: number;
  title: string;
  description: string;
  authorId: string;
  author: User;
  imageUrl?: string;
  address?: ItemLocation;
  eventTime?: number;
  eventType: string;
}
