import React, {useEffect, useState} from 'react';
import './App.css';
import TableComponent from "./components/table";
import {Button, Modal, notification} from "antd";
import {useStore} from "./store";
import {getData, postData} from "./services/api/api";
import {columnDataGenerator} from "./utils/columns";
import {ModalForm} from "./components/modal/modal";




function App() {
    const setInitialData = useStore((state) => state.setInitialData);
    const data = useStore((state) => state.data);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState<FormData | null>(null);
    const showModal = ()=> {
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
        getData("http://localhost:3005/api/data").then((res: any) => {
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

    const getEditData = (data: FormData):void => {
        setEditData(data)
        showModal()
    }

console.log(editData)
    const tableColumns =  columnDataGenerator(getEditData)

    return (
        <>
            <ModalForm editData={editData} postData={postData} handleCancel={handleCancel} handleOk={handleOk} handleGettingData={handleGettingData}  isModalOpen={isModalOpen} />
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
