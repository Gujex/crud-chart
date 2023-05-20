export interface ModalFormProps {
    handleCancel: () => void,
    handleOk: () => void,
    isModalOpen: boolean,
    postData: ( data: customFormData) => Promise<nonDataPromiseType>
    handleGettingData: () => void,
    editData?: customFormData | null
}

export interface customFormData {
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
export type nonDataPromiseType = {message: string, success: boolean}
