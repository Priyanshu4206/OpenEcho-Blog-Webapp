import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";
export class AuthServices {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl) // Your API Endpoint
      .setProject(conf.appwriteProjectId); // Your project ID

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      //   userAccount variable has a boolean value right now
      //   Here the creation of the account ends
      if (userAccount) {
        return { email, password };
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async loginAccount({ email, password }) {
    try {
      const response = await this.account.createEmailPasswordSession(
        email,
        password
      );
      // Returns a boolean value in response
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
      // Returns a object with all the user Fields
    } catch (error) {
      // console.log("Error in Getting the User", error);
      return null;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
}
// Object of the class that can be used for all the above mentioned functionalites helps in reducing the redundancy of the code
const authService = new AuthServices();
export default authService;
