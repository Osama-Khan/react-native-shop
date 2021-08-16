export interface IUser {
  id?: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  roles?: {id: number; name: string}[];
  dateOfBirth?: Date;
  profileImage?: string;
}

export class User implements IUser {
  id?: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  roles?: {id: number; name: string}[];
  dateOfBirth?: Date;
  profileImage?: string;

  constructor(obj?: IUser) {
    if (obj) {
      this.id = obj.id;
      this.username = obj.username;
      this.firstName = obj.firstName;
      this.lastName = obj.lastName;
      this.roles = obj.roles;
      this.dateOfBirth = obj.dateOfBirth;
      this.profileImage = obj.profileImage;
    }
  }
}
