export class LoginResponse {
    token: string;

    constructor(obj?: LoginResponse) {
        this.token = obj?.token;
    }
}