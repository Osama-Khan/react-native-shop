import {User} from '../../models/user';

export interface IUserState extends User {
  restoringState: boolean;
  token?: string;
}

export default class UserState extends User implements IUserState {
  restoringState = false;
  token?: string;

  constructor(obj?: IUserState) {
    super(obj);
    if (obj) {
      this.token = obj.token;
    }
  }

  /** Initializes a User from server JSON response. */
  static fromJson(data: any) {
    const user = new UserState(data);
    user.dateOfBirth = new Date(user.dateOfBirth!);
    return user;
  }
}
