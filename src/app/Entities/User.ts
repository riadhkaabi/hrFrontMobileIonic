import { Role } from './Role';
export class User {
    id?: number;
    uid: string;
    username?: string;
    firstName?: any;
    lastName?: any;
    password?: string;
    email?: string;
    phoneNumber?: string ;
    isActive?: boolean;
    createdAt?: string;
    updatedAt?: string;
    enabled?: boolean;
    authorities?: Role[];
    accountNonLocked?: boolean;
    credentialsNonExpired?: boolean;
    accountNonExpired?: boolean;
}
