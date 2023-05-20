export interface ModalFormProps {
    handleCancel: () => void,
    handleOk: () => void,
    isModalOpen: boolean,
    postData: (url: string, data: FormData) => any,
    handleGettingData: () => void,
    // editData: () => void | null,
    // editData: any,
    //editData edit Data === FormData or null
    editData: any
}

export interface FormData {
    name: string;
    email: string;
    gender: string;
    address: {
        street: string;
        city: string;
    };
    phone: string;
    id?: number;
}
