export type TUser = {
    sub: number | null;
    email: string;
    name: string;
    username: string;
    image: string | null;
    role: string;
    active: boolean | null;
};

export type TRegisterFormData = {
    name: string;
    username: string;
    password: string;
    dateBirth?: string;
    state?: string;
    ethnicity?: string;
    gender?: string;
    educationLevel?: string;
    hasDisability?: string;
    disabilityType?: boolean;
    needsSupportResources?: boolean;
    supportResourcesDescription?: string;
};

export type TRegisterFormDataTest = {
    user: TRegisterUser;
    student: TRegisterStudent;
};

export type TRegisterUser = {
    name: string;
    username: string;
    email: string;
    password: string;
    image?: string | null;
};

export type TRegisterStudent = {
    dateBirth?: string;
    state?: string;
    ethnicity?: string;
    gender?: string;
    educationLevel?: string;
    hasDisability?: boolean;
    disabilityType?: string;
    needsSupportResources?: boolean;
    supportResourcesDescription?: string;
};
