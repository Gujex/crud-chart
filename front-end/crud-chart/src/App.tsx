import React, {useEffect, useState} from 'react';
import './App.css';
import TableComponent from "./components/table";
import {Button, notification} from "antd";
import {useStore} from "./store";
import {getData, postData} from "./services/api/api";
import {columnsData} from "./utils/columns";
import ModalForm from "./components/modal/modal";



function App() {
    const setInitialData = useStore((state) => state.setInitialData);
    const data = useStore((state) => state.data);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = ()=> {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
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

    return (
        <>
            <div onClick={() => {
                notification['success']({
                    message: 'მოქმედება წარმატებით განხორციელდა',
                    description: "data.message",
                    duration: 2,
                });
            }}>asdasdasd</div>
            <ModalForm postData={postData} handleCancel={handleCancel} handleOk={handleOk} handleGettingData={handleGettingData}  isModalOpen={isModalOpen} />
            <div className="parent">
                <Button onClick={showModal} type={"primary"}>დამატება</Button>
                <div className={'table-parent'}>
                    <TableComponent dataSource={data} columns={columnsData}/>
                </div>
            </div>
        </>
    );
}

export default App;
