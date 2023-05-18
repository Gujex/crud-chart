import React, {useEffect, useState} from 'react';
import './App.css';
import TableComponent from "./components/table";
import {Button} from "antd";
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
    useEffect(() => {
        getData("http://localhost:3005/api/data").then((res: any) => {
            if (res.success) {
                setInitialData(res.data)
            } else {
                console.log('error', 'problem with getting data')
            }
        }).catch((er: any) => {
            console.log('error', er)
        })
    }, [])

    return (
        <>
            <ModalForm postData={postData} handleCancel={handleCancel} handleOk={handleOk}  isModalOpen={isModalOpen} />
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
