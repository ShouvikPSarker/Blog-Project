import conf from '../Conf/conf'
import { Client, Account, ID } from "appwrite";

export class Authservice{
    client = new Client()
    Account;
 // To use the Resources minimal, we will use the constructor as it will first create the Client and then will create an account
    constructor(){
        this.client
            .setEndpoint(conf.appwriteURl)
            .setProject(conf.appwriteProjectId)
    
        this.account = new Account(this.client)
    }
 // Now We will manage the account Creation service and Login Methods 
    // we don't want any further progress until account is created
    async CreateAccount ({email , password , name }){
        try {
            const userAccount = await this.account.create(ID.unique(), email , password , name)
            if (userAccount) {
                //Another Method
                return this.login(email , password)
            } else {
                return userAccount
            }

        } catch (error) {
            throw error
        }
    }

 // Login function
    async login ({email , password}){
        try {
            return await this.account.createEmailPasswordSession(email , password)

        } catch (error) {
            throw error
        }
    }

 // GetCurrentuser 
    async getCurrentUser(){
        try {
            await this.account.get()
        } catch (error) {
            // throw error
            console.log("Appwrite Server Error :: currentUser Error" ,error)
        }

        return null
    }
 // LogOut
    async logOut(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite Server Error :: Logout Error" ,error)
        }
    }
    




}

const authService = new Authservice()
export default authService