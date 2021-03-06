import axios from 'axios';
import Criteria from '../models/criteria';
import {User} from '../models/user';
import ApiService from './api.service';
import storageService from './storage.service';

type RegisterData = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  dateOfBirth: string;
};

class UserService extends ApiService {
  /**
   * Logs in the user with given parameters
   * @param username The username of the login user
   * @param password The password of the login user
   * @param context The context object containing user state
   * @param remember Should the token be remembered
   * @returns An object with user data along with token
   */
  async login(username: string, password: string, remember = true) {
    const obj = {username, password};
    const res = await axios.post(`${this.domain}/login`, obj, {
      headers: {'Content-type': 'application/json'},
    });
    const user = res.data;
    if (remember) {
      storageService.saveUserToken(user.token);
    }
    return res;
  }

  /**
   * Logs in the user using the jwt token in storage
   * @param token The token to use for login
   * @returns Response of the request
   */
  async loginWithToken(token: string) {
    const res = await axios.post(`${this.domain}/login/token`, undefined, {
      headers: {Authorization: `Bearer ${token}`},
    });
    return res;
  }

  /**
   * Registers a new user with the given parameters
   * @returns An object with user data
   */
  async register(data: RegisterData) {
    const res = await axios.post(`${this.domain}/register`, data, {
      headers: {'Content-type': 'application/json'},
    });
    return res;
  }

  /**
   * Gets all users
   * @param criteria Criteria object to filter the results
   * @returns object with user data and meta
   */
  async getUsers(criteria?: Criteria<User>) {
    const params = criteria?.getUrlParameters() || '';
    const res = await axios.get(`${this.domain}/users${params}`);
    return res;
  }
  /**
   * Gets the user with given id
   * @param id of the user to get
   * @returns user with given id
   */
  async getUser(id: number) {
    const res = await axios.get(`${this.domain}/users/${id}`);
    return res;
  }

  /**
   * Sends an update request to the server
   * @param id Id of the user to update
   * @param data object with properties of user
   * @returns The new user, after updation
   */
  async update(id: number, data: Partial<User>) {
    const res = await axios.patch(`${this.domain}/users/${id}`, data);
    return res;
  }

  /**
   * Sends a delete request to the server
   * @param id ID of the user to delete
   */
  async delete(id: number) {
    const res = await axios.delete(`${this.domain}/users/${id}`);
    return res;
  }
}

export default new UserService();
