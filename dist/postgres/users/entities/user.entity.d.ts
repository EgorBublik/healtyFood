export declare enum Role {
    Client = "client",
    Admin = "admin",
    Doctor = "doctor"
}
export declare class User {
    id: number;
    first_name: string;
    username: string;
    password: string;
    telegramId: string;
    role: string;
    doctor: User;
    clients: User[];
}
