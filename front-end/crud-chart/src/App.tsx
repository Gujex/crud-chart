import React, {useEffect} from 'react';
import './App.css';
import TableComponent from "./components/table";
import {Button} from "antd";
import {useStore} from "./store";
import {getData} from "./services/api/api";


const columns = [
    {
        title: 'name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'gender',
        dataIndex: 'gender',
        key: 'age',
    },
    {
        title: 'phone',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: 'email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'address',
        dataIndex: 'address',
        key: 'address',
        render: (info: any) => {
            const {city, street} = info
            return <div onClick={() => console.log(info)}>{`${city}, ${street}`}</div>
        }
    }]

function App() {
    const setInitialData = useStore((state) => state.setInitialData);
    const data = useStore((state) => state.data);

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
        <div className="parent">
            <Button onClick={() => console.log(data)} type={"primary"}>დამატება</Button>
            <div className={'table-parent'}>
                <TableComponent dataSource={data} columns={columns}/>
            </div>
        </div>
    );
}

export default App;
