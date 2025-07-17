import { useMemo } from "react";
import { Colors } from "../../../utils/colors";
import { EStatus } from "../../../utils/enum";

export const StatusTag = ({ isEnabled }: { isEnabled: boolean }) => {
  const statusStyles: { [key in EStatus]: React.CSSProperties } = {
    [EStatus.ACTIVE]: {
      color: Colors.kaitokeGreen,
      backgroundColor: Colors.pickFord,
      padding: "5px 10px",
      borderRadius: "5px",
      display: "inline-block",
      whiteSpace: "nowrap",
    },
    [EStatus.INACTIVE]: {
      color: Colors.loverKiss,
      backgroundColor: Colors.wePeep,
      padding: "5px 10px",
      borderRadius: "5px",
      fontWeight: "500",
      display: "inline-block",
      whiteSpace: "nowrap",
    },
    [EStatus.ALL]: {},
  };
  const statusText = useMemo(
    () => (isEnabled ? "Active" : "Inactive"),
    [isEnabled]
  );

  const status = useMemo(
    () => (isEnabled ? EStatus.ACTIVE : EStatus.INACTIVE),
    [isEnabled]
  );
  return (
    <div style={{ ...statusStyles[status], textAlign: "center" }}>
      {statusText}
    </div>
  );
};
