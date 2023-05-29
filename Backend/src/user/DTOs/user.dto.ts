export class UserDTO {
    id?: number;
    email: string;
    username: string;
    password: string;
    fName: string;
    lName: string;
    DOB: string;
    pNumber: string;
    address: string;

    constructor(email: string, username: string, password: string, fName: string, lName: string, DOB: string, pNumber: string, address: string) {
        this.email = email;
        this.username = username;
        this.password = password;
        this.fName = fName;
        this.lName = lName;
        this.DOB = DOB;
        this.pNumber = pNumber;
        this.address = address;
    }
}