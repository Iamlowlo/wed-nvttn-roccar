import {SpotifyFormattedTrack} from './spotify.model';

export interface User {
  id?: String;
  name: String;
  email: String;
  lunch: Boolean;
  party: Boolean;
  isKid?: Boolean;
  admin: Boolean;
  rsvp?: {
    ceremony: Boolean;
    lunch: Boolean;
    party: Boolean;
  };
  tracks?: Array<SpotifyFormattedTrack>;
}
