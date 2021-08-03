import {EntityType} from './abstract.type';
import {UserType} from './user.types';

type LocatableType = EntityType & {name: string};

export type CountryType = LocatableType & {
  iso2: string;
  iso3: string;
  phoneCode: number;
  capital: string;
  currency: string;
  native: string;
  region: string;
  subRegion: string;
  emoji: string;
  emojiU: string;
  states?: StateType[];
};

export type StateType = LocatableType & {
  country?: CountryType | string;
  cities?: CityType[];
};

export type CityType = LocatableType & {
  latitude: number;
  longitude: number;
  state?: StateType;
};

export type AddressType = EntityType & {
  tag: string;
  address: string;
  user?: UserType;
  city?: CityType | string;
};
