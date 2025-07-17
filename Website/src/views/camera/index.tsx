import { useEffect, useMemo, useState } from "react";
import { ConfirmActionModal } from "../../components/modals/ConfirmActionModal";
import { SearchBar } from "../../components/SearchBar";
import { SelectBar } from "../../components/SelectBar";
import CustomTable from "../../components/Table";
import {
  getListCameraService,
  updateCameraStatusService,
} from "../../services/camera.service";
import { EStatus } from "../../utils/enum";
import { Size } from "../../utils/size";
import { ICamera } from "../../utils/types";
import { useGlobalContext } from "../../utils/globalContext";

const Dashboard = () => {
  const {setTitle} = useGlobalContext();
  setTitle('Camera Management')
  const data = [
    { value: EStatus.ACTIVE, label: "Active" },
    { value: EStatus.INACTIVE, label: "Inactive" },
  ];
  const [filter, setFilter] = useState<EStatus>(EStatus.ACTIVE);
  const [search, setSearch] = useState("");
  const buttonTitle = useMemo(
    () => (filter === EStatus.ACTIVE ? "Inactivate" : "Activate"),
    [filter]
  );
  const [selectedList, setSelectedList] = useState<string[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [list, setList] = useState<ICamera[]>([]);

  const getCameraList = async () => {
    try {
      const cameraList = await getListCameraService({
        isEnabled: filter === EStatus.ACTIVE,
        search: search,
      });
      setList(cameraList);
      return data;
    } catch (error) {
      console.error("Error fetching camera list:", error);
      return [];
    }
  };

  const handleOk = async () => {
    try {
      await updateCameraStatusService(selectedList, filter !== EStatus.ACTIVE);
      getCameraList();
    } catch (e) {
      console.log("error update camera status service", e);
    } finally {
      setIsOpenModal(false);
      setSelectedList([]);
    }
  };

  const updateCameraStatus = async (id: string) => {
    try {
      await updateCameraStatusService([id], filter !== EStatus.ACTIVE);
      getCameraList();
    } catch (e) {
      console.log("error update camera status service", e);
    } finally {
      setSelectedList([]);
    }
  };

  const handleActionClick = (id: string) => {
    updateCameraStatus(id);
  };

  useEffect(() => {
    getCameraList();
  }, [filter, search]);

  const isDisabled = useMemo(() => {
    return selectedList.length === 0;
  }, [selectedList]);

  const onSearchChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearch(e.target.value);
  };

  return (
    <div
      style={{
        width: "100%",
        overflow: "hidden",
        gap: "2vh",
        flexDirection: "column",
        display: "flex",
        height: "100%",
      }}
    >
      <div style={{ fontSize: Size.L }}>Camera List</div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <div style={{ flexDirection: "row", gap: 10, display: "flex" }}>
          <SearchBar onSearchChange={onSearchChange} />
          <SelectBar<EStatus>
            options={data}
            defaultValue={EStatus.ACTIVE}
            setSelectedValue={setFilter}
          />
        </div>
        <ConfirmActionModal
          title={buttonTitle}
          setIsModalOpen={setIsOpenModal}
          isModalOpen={isOpenModal}
          handleOk={handleOk}
          isDisabled={isDisabled}
        />
      </div>
      <div
        style={{
          backgroundColor: "white",
          display: "flex",
          flex: 1,
          overflow: "hidden",
        }}
      >
        <CustomTable
          status={filter}
          setSelectedList={setSelectedList}
          cameraList={list}
          handleActionClick={handleActionClick}
        />
      </div>
    </div>
  );
};

export default Dashboard;
