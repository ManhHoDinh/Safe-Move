import type { TableColumnsType, TableProps } from "antd";
import { ConfigProvider, Modal, Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { CiCircleRemove } from "react-icons/ci";
import { MdOutlineAddBox } from "react-icons/md";
import { Colors } from "../utils/colors";
import { EStatus } from "../utils/enum";
import { Size } from "../utils/size";
import { ICamera } from "../utils/types";
import { StatusTag } from "../views/camera/components/StatusTag";
import "./index.css";

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

const columns = (
  status: EStatus,
  handleOpenModal: (id: string) => void
): TableColumnsType<ICamera> => [
  { title: "ID", dataIndex: "id", align: "center" },
  { title: "Name", dataIndex: "name", align: "center" },
  { title: "District", dataIndex: "dist", align: "center" },
  { title: "Last Modified", dataIndex: "lastModified", align: "center" },
  {
    title: "Status",
    dataIndex: "isEnabled",
    render: (isEnabled: boolean) => (
      <span>
        <StatusTag isEnabled={isEnabled} />
      </span>
    ),
    align: "center",
  },
  {
    title: "Action",
    render: (_: any, record: ICamera) =>
      status === EStatus.ACTIVE ? (
        <CiCircleRemove
          size={Size.L}
          onClick={() => handleOpenModal(record.id)}
        />
      ) : (
        <MdOutlineAddBox
          size={Size.L}
          onClick={() => handleOpenModal(record.id)}
        />
      ),
    align: "center",
  },
];

const CustomTable = ({
  status,
  setSelectedList,
  cameraList,
  handleActionClick,
}: {
  status: EStatus;
  setSelectedList: (val: string[]) => void;
  cameraList: ICamera[];
  handleActionClick: (id: string) => void;
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const divRef = useRef<HTMLDivElement>(null);
  const [divHeight, setDivHeight] = useState<number>(0);
  const [data, setData] = useState<ICamera[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedCameraId, setSelectedCameraId] = useState<string | null>(null);

  useEffect(() => {
    setData(cameraList);
    setSelectedRowKeys([]);
  }, [cameraList]);

  useEffect(() => {
    if (divRef.current) {
      const height = divRef.current.clientHeight;
      setDivHeight(height);
    }
    const handleResize = () => {
      if (divRef.current) {
        setDivHeight(divRef.current.clientHeight);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
    const stringSelectedRowKeys = newSelectedRowKeys.map((key) =>
      key.toString()
    );
    setSelectedList(stringSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<ICamera> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleOpenModal = (id: string) => {
    setSelectedCameraId(id);
    setIsOpenModal(true);
  };

  const handleConfirmAction = () => {
    if (selectedCameraId) {
      handleActionClick(selectedCameraId);
    }
    setIsOpenModal(false);
    setSelectedCameraId(null);
  };

  return (
    <div
      style={{
        width: "100%",
        flexDirection: "column",
        height: "100%",
        overflowX: "auto",
      }}
      ref={divRef}
    >
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBorderRadius: 0,
              rowSelectedBg: Colors.primary[50],
              rowSelectedHoverBg: Colors.primary[100],
            },
          },
          token: {
            colorPrimary: Colors.kingTide,
            colorPrimaryHover: Colors.kingTide,
          },
        }}
      >
        <Table<ICamera>
          rowSelection={rowSelection}
          columns={columns(status, handleOpenModal)}
          dataSource={data}
          pagination={{ position: ["bottomCenter"] }}
          scroll={{ y: divHeight - 55 * 2 - 10, x: 600 }}
          rowKey="_id"
        />
        <Modal
          open={isOpenModal}
          onOk={handleConfirmAction}
          onCancel={() => setIsOpenModal(false)}
          centered
          width={400}
          closable={false}
          okText="Confirm"
          okButtonProps={{ style: { backgroundColor: Colors.kingTide } }}
        >
          <div style={{ fontSize: Size.M }}>
            Are you sure you want to{" "}
            {status === EStatus.ACTIVE ? "deactivate" : "activate"} this camera?
          </div>
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default CustomTable;
