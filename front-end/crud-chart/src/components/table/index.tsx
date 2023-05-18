import { Table, } from 'antd';


const TableComponent = ({dataSource, columns}:any) => {
    return <Table dataSource={dataSource} columns={columns} />;
}

export default TableComponent;


