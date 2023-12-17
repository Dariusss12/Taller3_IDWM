export interface FormErrors {
    [key: string]: string;
};

export interface FormEditUser {
    name: string;
    email: string;
    birth_year: string;
 
};

export interface FormChangePassword {
    old_password: string;
    new_password: string;
};