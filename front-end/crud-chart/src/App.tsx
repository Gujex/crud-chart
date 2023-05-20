import React, {useEffect, useState} from 'react';
import './App.css';
import TableComponent from "./components/table";
import {Button, Modal, notification} from "antd";
import {useStore} from "./store";
import {getData, postData, deleteData} from "./services/api/api";
import {columnDataGenerator} from "./utils/columns";
import {ModalForm} from "./components/modal/modal";


function App() {
    const setInitialData = useStore((state) => state.setInitialData);
    const data = useStore((state) => state.data);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState<FormData | null>(null);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setEditData(null)
    };
    const handleGettingData = () => {
        getData().then((res: any) => {
            if (res.success) {
                setInitialData(res.data)
            } else {
                notification['error']({
                    message: 'მოქმედება ვერ განხორციელდა',
                    duration: 2,
                });
            }
        }).catch((err: any) => {
            notification['error']({
                message: err.message,
                duration: 2,
            });
        })
    }
    useEffect(() => {
        handleGettingData()
    }, [])

    const getEditData = (data: FormData): void => {
        setEditData(data)
        showModal()
    }

    const confirmModal = (title: string, content: string, id: number): void => {
        Modal.confirm({
            title,
            content,
            onOk: () => {
                deleteData(id).then((res: any) => {
                    if (res.success) {
                        handleGettingData()
                        notification['success']({
                            message: res.message,
                            duration: 2,
                        });
                    } else {
                        notification['error']({
                            message: 'მოქმედება ვერ განხორციელდა',
                            duration: 2,
                        });
                    }
                }).catch((err: any) => {
                    notification['error']({
                        message: err.message,
                        duration: 2,
                    });
                })
            }
        });
    };

    const tableColumns = columnDataGenerator(getEditData, confirmModal)


    return (
        <>
            {/*<div onClick={() => confirmModal('asdasd', 'asdasd')}>asdasd</div>*/}
            <ModalForm editData={editData} postData={postData} handleCancel={handleCancel} handleOk={handleOk}
                       handleGettingData={handleGettingData} isModalOpen={isModalOpen}/>
            <div className="parent">
                <Button onClick={showModal} type={"primary"}>დამატება</Button>
                <div className={'table-parent'}>
                    <TableComponent dataSource={data} columns={tableColumns}/>
                </div>
            </div>
        </>
    );
}

export default App;
