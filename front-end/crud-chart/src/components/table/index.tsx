import { Table, } from 'antd';
import {customFormData} from "../../types/modal-types";
import { ColumnsType } from 'antd/es/table';


type props = {
    dataSource: Array<customFormData>,
    columns: ColumnsType<customFormData>
}
const TableComponent = ({dataSource, columns}:props) => {
    return <Table dataSource={dataSource} columns={columns} />;
}

export default TableComponent;


