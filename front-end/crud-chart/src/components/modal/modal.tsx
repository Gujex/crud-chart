import React from 'react';
import {ModalFormProps, FormData} from "../../types/modal-types";
import {Form, Input, Select, Button, Modal} from 'antd';

const {Option} = Select;



const ModalForm: React.FC<ModalFormProps> = ({handleCancel, handleOk, isModalOpen, postData}) => {

    const onFinish = (values: FormData) => {
        console.log(JSON.stringify({ id: "71", ...values}))
        postData("http://localhost:3005/api/data", {...values, id: "71"}).then((res:any) => {
            console.log(res)
        })
    };
    return (
        <>
            <Modal footer={[]}  title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    layout={'vertical'}
                    onFinish={onFinish}
                    initialValues={{gender: 'female'}}>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your name',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your email',
                            },
                            {
                                type: 'email',
                                message: 'Please enter a valid email',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Gender"
                        name="gender"
                        rules={[
                            {
                                required: true,
                                message: 'Please select your gender',
                            },
                        ]}
                    >
                        <Select>
                            <Option value="male">Male</Option>
                            <Option value="female">Female</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Street"
                        name={['address', 'street']}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your street address',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="City"
                        name={['address', 'city']}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your city',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your phone number',
                            },
                            {
                                pattern: /^\+\d{1,3}\s\(\d{1,3}\)\s\d{1,4}-\d{1,4}$/,
                                message: 'Please enter a valid phone number',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default ModalForm;
