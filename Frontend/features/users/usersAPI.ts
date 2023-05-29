import axios from "axios";
import { Platform } from "react-native";
import { UsersSignup } from './usersSignup'
import { UsersLogin } from './usersLogin'

export class UsersAPI {
    static baseUrl: string = Platform.OS === 'ios' ? 'localhost' : '10.0.2.2';

    static async signup(user: UsersSignup) {
        try {
            // const result = await axios.post("http://" + this.ip + ':3000/auth/signup', user);
            const result = await axios.post("http://" + this.baseUrl + ':3000/auth/signup-tenant', user);
            
            return result.data;
        }
        catch(error) {
        }
    }

    static async login(user: UsersLogin) {
        // const result = await axios.post("http://" + this.ip + ':3000/auth/login', user);
        try {
            const result = await axios.post("http://" + this.baseUrl + ':3000/auth/login', user);
            return result.data;
        }
        catch(error) {
            console.log("Front - log ", error)
        }
    }
}