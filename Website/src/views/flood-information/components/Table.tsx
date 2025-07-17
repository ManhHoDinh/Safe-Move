import type { TableColumnsType, TableProps } from "antd";
import { ConfigProvider, Table, Tag } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Colors } from "../../../utils/colors";
import { EInformationStatus } from "../../../utils/enum";
import { IFloodInformation } from "../../../utils/types";
import FloodInformationDetail from "./FloodInformationDetail";
import { getListFloodInformationService } from "../../../services/flood-information.service";

const columns: TableColumnsType<IFloodInformation> = [
  { title: "ID", dataIndex: "_id", align: "center" },
  { title: "Username", dataIndex: "userName", align: "center" },
  { title: "Location", dataIndex: "locationName", align: "center" },
  { title: "Created At", dataIndex: "date", align: "center" },
  {
    title: "Status",
    dataIndex: "status",
    render: (status: EInformationStatus) => (
      <div>
        {status === EInformationStatus.PENDING ? (
          <Tag color="lightGrey">Pending</Tag>
        ) : status === EInformationStatus.APPROVED ? (
          <Tag color="green">Approved</Tag>
        ) : (
          <Tag color="red">Declined</Tag>
        )}
      </div>
    ),
    align: "center",
  },
];

const FloodInformationTable = ({
  filter,
  search,
}: {
  filter?: EInformationStatus;
  search?: string
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [divHeight, setDivHeight] = useState<number>(0);
  const [data, setData] = useState<IFloodInformation[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedRow, setSeletedRow] = useState<IFloodInformation>();
  const [list, setList] = useState<IFloodInformation[]>([])

  const getFloodInformationList = async () => {
    try {
      const floodInformationList = await getListFloodInformationService({
        status: filter,
        search: search,
      });
      setList(floodInformationList);
      return data;
    } catch (error) {
      console.error("Error fetching flood information list:", error);
      return [];
    }
  };

  useEffect(() => {
    getFloodInformationList();
  }, [filter, search, isOpenModal]);

  useEffect(() => {
    setData(list);
  }, [list]);

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
        <Table<IFloodInformation>
          columns={columns}
          dataSource={data}
          pagination={{ position: ["bottomCenter"] }}
          scroll={{ y: divHeight - 55 * 2 - 10, x: 600 }}
          rowKey="_id"
          onRow={(record) => ({
            onClick: () => {
              setIsOpenModal(true);
              setSeletedRow(record);
            },
          })}
        />
      </ConfigProvider>
      <FloodInformationDetail
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        data={selectedRow}
      />
    </div>
  );
};

export default FloodInformationTable;
