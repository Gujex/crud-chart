import React, { useEffect, useState } from "react";
import "./App.css";
import TableComponent from "./components/table";
import { Button, Modal, notification, Tabs } from "antd";
import type { TabsProps } from "antd";
import { customFormData } from "./types/modal-types";
import { useStore } from "./store";
import { getData, postData, deleteData } from "./services/api/api";
import { columnDataGenerator } from "./utils/columns";
import { ModalForm } from "./components/modal/modal";
import DemoPie from "./components/chart";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: `Table`,
  },
  {
    key: "2",
    label: `Chart`,
  },
];

function App() {
  const setInitialData = useStore((state) => state.setInitialData);
  const data = useStore((state) => state.data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<customFormData | null>(null);
  const [activeTab, setActiveTab] = useState("1");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setEditData(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditData(null);
  };
  const handleGettingData = () => {
    getData()
      .then((res: { data: Array<customFormData>; success: boolean }) => {
        if (res.success) {
          res.data.forEach((el: any) => {
            el.key = el.id;
          });
          //key added for antd table
          setInitialData(res.data);
        } else {
          notification["error"]({
            message: "მოქმედება ვერ განხორციელდა",
            duration: 2,
          });
        }
      })
      .catch((err: any) => {
        notification["error"]({
          message: err.message,
          duration: 2,
        });
      });
  };
  useEffect(() => {
    handleGettingData();
  }, []);

  const getEditData = (data: customFormData): void => {
    if (data) {
      setEditData(data);
      showModal();
    }
  };

  //  calculate the percentages by city
  const cityCounts: { [city: string]: number } = {};
  data.forEach((item) => {
    const city = item.address.city;
    cityCounts[city] = (cityCounts[city] || 0) + 1;
  });
  const totalPeople = data.length;
  const citiesData = Object.entries(cityCounts).map(([city, count]) => ({
    type: city,
    value: (count / totalPeople) * 100,
  }));

  const confirmModal = (title: string, content: string, id: number): void => {
    Modal.confirm({
      title,
      content,
      onOk: () => {
        deleteData(id)
          .then((res: any) => {
            if (res.success) {
              handleGettingData();
              notification["success"]({
                message: res.message,
                duration: 2,
              });
            } else {
              notification["error"]({
                message: "მოქმედება ვერ განხორციელდა",
                duration: 2,
              });
            }
          })
          .catch((err: any) => {
            notification["error"]({
              message: err.message,
              duration: 2,
            });
          });
      },
    });
  };

  const tableColumns = columnDataGenerator(getEditData, confirmModal);
  const onChange = (key: string) => {
    setActiveTab(key);
  };

  return (
    <>
      <Tabs centered defaultActiveKey="1" items={items} onChange={onChange} />
      <ModalForm
        editData={editData}
        postData={postData}
        handleCancel={handleCancel}
        handleOk={handleOk}
        handleGettingData={handleGettingData}
        isModalOpen={isModalOpen}
      />
      {activeTab === "1" ? (
        <div className="parent">
          <Button onClick={showModal} type={"primary"}>
            Add item
          </Button>
          <div className={"table-parent"}>
            <TableComponent dataSource={data} columns={tableColumns} />
          </div>
        </div>
      ) : (
        <div style={{ padding: "50px" }}>
          {" "}
          <DemoPie data={citiesData} />{" "}
        </div>
      )}
    </>
  );
}

export default App;
