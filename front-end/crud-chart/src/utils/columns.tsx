import {Button} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import React from "react";

export const columnDataGenerator = (getEditData:any) => {
    return  [
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
                // const {city, street} = info
                return <div onClick={() => console.log(info)}>{`${info?.city}, ${info?.street}`}</div>
            }
        },
        {
            title: 'operate',
            key: 'operate',
            render: (info:any) => {
                return <div><Button type={'text'}><DeleteOutlined/></Button> <Button onClick={()=>getEditData(info)} type={'text'}><EditOutlined/></Button>
                </div>
            }
        },
    ]
}

// export const columnsData =
