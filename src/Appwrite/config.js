import conf from '../Conf/conf'
import { Client, Account, ID , Databases , Storage, Query} from "appwrite";
export class Services{
    client = new Client()
    databases;
    storage;
    
    constructor(){
        this.client
            .setEndpoint(conf.appwriteURl)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client)
    }
 //Post Services
    //CreatePost function
        async createPost({title , status , featuredimage , userId, content}){
            try {
                return await this.databases.createDocument(
                    conf.appwriteDatabaseId , conf.appwriteCollectionId ,ID.unique(),
                    {
                        title , content ,status , featuredimage , userId
                    }
                )
            } catch (error) {
                console.log("Appwrite Server Error :: CreatePost Error" ,error)
            }
        }
    // UpdatePost Function
        async updatePost(ID , {title , status , featuredimage , userId, content}){
            try {
                return await this.databases.updateDocument(
                    conf.appwriteDatabaseId , conf.appwriteCollectionId , ID ,
                    {
                        title , content , status , featuredimage
                    }
                )
            } catch (error) {
                console.log("Appwrite Server Error :: UpdatePost Error" ,error) 
            }
        }
    //DeletePost Function
         async deletePost(ID){
            try {
                return await this.databases.deleteDocument(
                    conf.appwriteDatabaseId , conf.appwriteCollectionId , ID
                )
            } catch (error) {
                console.log("Appwrite Server Error :: Deleating the Post Error" ,error)
            }
        }
    //GetPost Function
        async getPost(ID){
            try {
                return await this.databases.getDocument(
                    conf.appwriteDatabaseId , conf.appwriteCollectionId , ID
                )
            } catch (error) {
                console.log("Appwrite Server Error :: GetPost Error" ,error)
                return false
            }
        }
    //Listing Posts
        async getPosts(queries = [Query.equal("status" , "active")]){
            try {
                return await this.databases.listDocuments(
                    conf.appwriteDatabaseId,conf.appwriteCollectionId,queries
                )
            } catch (error) {
                console.log("Appwrite Server Error :: GettingPosts Error" ,error)
                return false
            }
        }
 //FileUpload Services
    //UploadFile
    async uploadFile(file){
        try {
            return await this.storage.createFile(
                conf.appwriteStorageId , ID.unique(), file
            )
        } catch (error) {
            console.log("Appwrite Server Error :: FileUpload Error" ,error)
            return false
        }
    }
    //DeleteFile
    async deleteFile(fileId){
        try {
            await this.storage.deleteFile(
                conf.appwriteStorageId ,fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite Server Error :: Deleting File Error" ,error)
        }
    }
    //PreviewFile
    filepreview(fileId){
        return this.storage.getFilePreview(
            conf.appwriteStorageId , fileId 
        ) 
    }

}
const appwriteservice = new Services()
export default appwriteservice;