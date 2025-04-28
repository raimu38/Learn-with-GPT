declare class CreateUserDto {
    name: string;
    email: string;
}
export declare class UsersController {
    getAll(): {
        id: number;
        name: string;
        email: string;
    }[];
    getById(id: string): {
        id: string;
        name: string;
        email: string;
    };
    create(dto: CreateUserDto): {
        name: string;
        email: string;
        id: number;
    };
}
export declare class HealthController {
    check(): {
        status: string;
    };
}
export {};
