export interface LoginResponse {
  expiration: Date;
  user:       User;
  token:      string;
}

export interface User {
  username:              string;
  authorities:           Authority[];
  accountNonExpired:     boolean;
  accountNonLocked:      boolean;
  credentialsNonExpired: boolean;
  enabled:               boolean;
  id?:                    number;
}

export interface Authority {
  authority: string;
}

export interface Login{
  username: string;
  password: string;
}
