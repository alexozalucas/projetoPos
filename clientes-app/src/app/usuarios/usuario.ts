import { Role } from "./roles";

export class Usuario{

    id: number;
	email: string;	
	enabled: boolean;
    displayName: string;	
    roles: Array<Role>;
}
