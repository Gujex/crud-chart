import React, {useEffect} from 'react';
import {ModalFormProps, customFormData} from "../../types/modal-types";
import {Form, Input, Select, Button, Modal, notification} from 'antd';
import {updateData} from "../../services/api/api";

const {Option} = Select;

export const ModalForm: React.FC<ModalFormProps> = ({
                                                        handleCancel,
                                                        handleOk,
                                                        isModalOpen,
                                                        postData,
                                                        handleGettingData,
                                                        editData
                                                    }) => {


    //I know that  Math random isn't a good idea for id, but for this example it's ok
    const onFinish = (values: customFormData) => {
        if (editData) {
            updateData({id: editData.id, ...values}).then((res: { message: string, success: boolean }) => {
                if (res.success) {
                    notification['success']({
                        message: res.message,
                        duration: 2,
                    });
                    handleOk()
                    handleGettingData()
                } else {
                    notification['error']({
                        message: res.message,
                        duration: 2,
                    });
                }
            }).catch((err: any) => {
                notification['error']({
                    message: err.message,
                    duration: 2,
                });
            })
            return
        }
        postData({id: Math.random(), ...values}).then((res: any) => {
            console.log(res)
            if (res.success) {
                notification['success']({
                    message: 'მოქმედება წარმატებით განხორციელდა',
                    duration: 2,
                });
                handleOk()
                handleGettingData()
            } else {
                notification['error']({
                    message: 'მოქმედება ვერ განხორციელდა',
                    description: "data.message",
                    duration: 2,
                });
            }
        })
    };
    const [form] = Form.useForm();


    useEffect(() => {
        if (editData) {
            form.setFieldsValue({...editData});
        } else {
            form.resetFields();
        }
    }, [editData, form]);


    return (
        <>
            <Modal footer={[]} title={`${editData ? 'Edit item' : 'Add item'}`} open={isModalOpen} onOk={handleOk}
                   onCancel={handleCancel} forceRender>
                <Form
                    layout={'vertical'}
                    onFinish={onFinish}
                    form={form}
                >
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
                        <Select popupMatchSelectWidth >
                            <Option key="male" value="male">Male</Option>
                            <Option key="female" value="female">Female</Option>
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


