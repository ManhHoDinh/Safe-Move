import { useState } from "react";
import { BiCctv } from "react-icons/bi";
import { IoMapOutline } from "react-icons/io5";
import { RiUserVoiceLine } from "react-icons/ri";
import { Colors } from "../utils/colors";
import { ETabName } from "../utils/enum";
import { Size } from "../utils/size";
import { LinkTab } from "./LinkTab";

export const Sidebar = (props: {
  open?: boolean;
  onClose?: React.MouseEventHandler<HTMLSpanElement>;
  style?: React.CSSProperties;
}) => {
  const { open, onClose, style } = props;
  const [selectedTab, setSelectedTab] = useState<ETabName>(ETabName.CAMERA);
  return (
    <div style={style}>
      <div
        style={{
          height: "20%",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          backgroundColor: "white",
          borderBottomColor: Colors.echoBlue,
          borderBottomWidth: 1,
          borderBottomStyle: "solid",
        }}
      >
        <div
          style={{
            color: Colors.black,
            fontSize: Size.XXXL,
            fontWeight: "bold",
          }}
        >
          SAFEMOVE
        </div>
      </div>
      <div
        style={{
          alignItems: "flex-start",
          display: "flex",
          gap: 20,
          flexDirection: "column",
          height: "80%",
        }}
      >
        <LinkTab
          link="/"
          icon={BiCctv}
          title="Camera"
          isActive={selectedTab === ETabName.CAMERA}
          onSelect={() => setSelectedTab(ETabName.CAMERA)}
        />
        <LinkTab
          link="/map"
          icon={IoMapOutline}
          title="Map"
          isActive={selectedTab === ETabName.MAP}
          onSelect={() => setSelectedTab(ETabName.MAP)}
        />
        <LinkTab
          link="/flood-information"
          icon={RiUserVoiceLine}
          title="Flood Information"
          isActive={selectedTab === ETabName.FLOOD_INFORMATION}
          onSelect={() => setSelectedTab(ETabName.FLOOD_INFORMATION)}
        />
      </div>
    </div>
  );
};
