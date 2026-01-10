export enum UserRole {
    ADMIN = 'ADMIN',
    CUSTOMER = 'CUSTOMER'
}

export class User {
    constructor(
        public readonly id: string,
        public readonly email: string,
        public readonly name: string,
        public readonly role: UserRole,
        public readonly avatarUrl?: string
    ) { }

    get isAdmin(): boolean {
        return this.role === UserRole.ADMIN;
    }

    get isCustomer(): boolean {
        return this.role === UserRole.CUSTOMER;
    }
}
