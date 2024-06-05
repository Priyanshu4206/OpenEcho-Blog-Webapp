import { Client, Databases, ID, Query, Storage } from "appwrite";
import conf from "../conf/conf";
export class Service {
  client = new Client();
  database;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.database = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // Slug is nothing but the unqie id or something that identifies the post
  async getPost(slug) {
    try {
      return await this.database.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  //  Querying for docuements(blogs) that have status as active
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.database.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  //  Creating a Post
  async createPost({
    title,
    slug,
    content,
    featuredImage,
    status,
    userId,
    userName,
  }) {
    try {
      return await this.database.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
          userName,
        }
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  //   Updating a Post
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.database.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        { title, content, featuredImage, status }
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  //   Deleting a Post
  async deletePost(slug) {
    try {
      await this.database.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      throw error;
    }
  }

  // Adding data to the bucket (Storage service)
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  // Deleting data from the bucket (Storage Service)
  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  //   geting preview of the file (Storage Service)
  getFilepreview(fileId) {
    try {
      const Imglink = this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
      return Imglink.href;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
// Object of the class that can be used for all the above mentioned functionalites helps in reducing the redundancy of the code
const service = new Service();
export default service;
