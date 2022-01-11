export class User {
    id: number;
    email: string;
    username: string;
    password: string;
    name: UserName;
    address: Address;
    phone: string;
}

export class UserName {
    firstname: string;
    lastname: string;
}

export class Address {
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation: Geolocation;
}

export class GeoLocation {
    lat: string;
    long: string;
}