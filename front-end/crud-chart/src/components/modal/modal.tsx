import React from 'react';
import { Modal } from 'antd';
interface ModalFormProps {
    handleCancel: () => void;
    handleOk: () => void;
    isModalOpen: boolean;
}

const ModalForm: React.FC<ModalFormProps> = ({handleCancel, handleOk, isModalOpen}) => {


    return (
        <>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </>
    );
};

export default ModalForm;
