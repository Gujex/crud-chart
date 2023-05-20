export interface ModalFormProps {
    handleCancel: () => void;
    handleOk: () => void;
    isModalOpen: boolean;
    postData: (url: string, data: FormData) => any;
    handleGettingData: () => void;

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
