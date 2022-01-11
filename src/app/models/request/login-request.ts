export class LoginRequest {
    username: string;
    password: string;

    constructor(obj?: LoginRequest) {
        this.username = obj?.username;
        this.password = obj?.password;
    }
}