export interface User {
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
}
