export type TUser = {
    name: string;
    username: string;
    role: string;
    phoneNumber: string;
    image: string;
    acessToken: string;
};

export type TRegisterFormData = {
    dateBirth?: string; 
    state?: string; 
    ethnicity?: string; 
    gender?: string; 
    educationLevel?: string; 
    hasDisability?: string; 
    disabilityType?: boolean; 
    needsSupportResources?: boolean; 
    supportResourcesDescription?: string; 
}
