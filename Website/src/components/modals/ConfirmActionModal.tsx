import { Button, ConfigProvider, Modal } from "antd";
import { Colors } from "../../utils/colors";
import { Size } from "../../utils/size";

export const ConfirmActionModal = ({
  title,
  handleOk,
  setIsModalOpen,
  isModalOpen,
  isDisabled,
  hasButton = true,
}: {
  title: string;
  handleOk: () => void;
  setIsModalOpen: (val: boolean) => void;
  isModalOpen: boolean;
  isDisabled: boolean;
  hasButton?: boolean;
}) => {
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {hasButton && (
        <Button
          type="primary"
          onClick={showModal}
          style={{
            backgroundColor: isDisabled
              ? Colors.disabledColor
              : Colors.kingTide,
          }}
          disabled={isDisabled}
        >
          {title}
        </Button>
      )}

      <ConfigProvider
        theme={{
          token: {
            colorPrimaryHover: Colors.kingTide,
          },
        }}
      >
        <Modal
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          centered
          width={400}
          closable={false}
          okText="Confirm"
          okButtonProps={{ style: { backgroundColor: Colors.kingTide } }}
          cancelButtonProps={{ style: {} }}
        >
          <div style={{ fontSize: Size.M }}>
            Are you sure you want to{" "}
            {title === "Activate" ? "activate" : "deactivate"} this camera?
          </div>
        </Modal>
      </ConfigProvider>
    </>
  );
};
