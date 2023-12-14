export interface RegisterCredentials {
    name: string;
    email: string;
    birth_year: number;
    rut: string;   
};

export interface LoginCredentials {
    email: string;
    password: string;
};
