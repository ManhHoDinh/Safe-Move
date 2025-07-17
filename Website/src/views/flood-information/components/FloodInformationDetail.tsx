import { ConfigProvider, Image, Modal } from "antd";
import { useMemo } from "react";
import { updateFloodInformationService } from "../../../services/flood-information.service";
import { Colors } from "../../../utils/colors";
import { EInformationStatus } from "../../../utils/enum";
import { formatDate } from "../../../utils/formatDate";
import { IFloodInformation } from "../../../utils/types";

interface IProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  data?: IFloodInformation;
}
const FloodInformationDetail = ({ isOpen, setIsOpen, data }: IProps) => {
  // const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const handleOk = async () => {
    if (!data || !data._id) return;
    await updateFloodInformationService({
      id: data._id,
      data: { ...data, status: EInformationStatus.APPROVED },
    })
      .then((updatedFlood) => {
        console.log("Updated Flood Information:", updatedFlood);
      })
      .catch((error) => {
        console.error("Error updating flood information:", error);
      });
    setIsOpen(false);
  };

  const handleDecline = async () => {
    if (!data || !data._id) return;
    await updateFloodInformationService({
      id: data._id,
      data: { ...data, status: EInformationStatus.DECLINED },
    })
      .then((updatedFlood) => {
        console.log("Updated Flood Information:", updatedFlood);
      })
      .catch((error) => {
        console.error("Error updating flood information:", error);
      });
    setIsOpen(false);
  };

  const floodStatus = useMemo(() => {
    return data?.modelDetectFloodLevel === 0 ? "Normal" : "Flood";
  }, [data]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: Colors.kingTide,
          colorPrimaryHover: Colors.kingTide,
        },
      }}
    >
      <Modal
        title="Flood Information Detail"
        open={isOpen}
        onOk={handleOk}
        onCancel={() => setIsOpen(false)}
        okButtonProps={{
          style: {
            display:
              data?.status === EInformationStatus.PENDING
                ? "inline-block"
                : "none",
          },
        }}
        cancelButtonProps={{
          style: {
            display:
              data?.status === EInformationStatus.PENDING
                ? "inline-block"
                : "none",
          },
          onClick: handleDecline
        }}
        okText={"Confirm"}
        cancelText={"Decline"}
      >
        <div style={{ display: "flex", gap: 15, flexDirection: "column" }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ width: "10vw" }}>Username:</div>
            <div>{data?.userName}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ width: "10vw" }}>Location:</div>
            <div>{data?.locationName}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ width: "10vw" }}>Message:</div>
            <div>{data?.message}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ width: "10vw" }}>Date:</div>
            <div>{data?.date ? formatDate(data?.date) : "N/A"}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ width: "10vw" }}>Detected flood level:</div>
            <div>{floodStatus}</div>
          </div>
          <Image
            src={data?.url}
            alt="Flood Information"
            width={436}
            style={{ cursor: "pointer" }}
          />
        </div>
      </Modal>
      {/* <ConfirmActionModal
        title={'buttonTitle'}
        setIsModalOpen={setIsOpenConfirmModal}
        isModalOpen={isOpenConfirmModal}
        handleOk={handleOk}
        hasButton={false}
        isDisabled={false}
      /> */}
    </ConfigProvider>
  );
};

export default FloodInformationDetail;
