import { useState } from "react";
import { SearchBar } from "../../components/SearchBar";
import { SelectBar } from "../../components/SelectBar";
import { EInformationStatus } from "../../utils/enum";
import { Size } from "../../utils/size";
import FloodInformationTable from "./components/Table";
import { useGlobalContext } from "../../utils/globalContext";

const FloodInformation = () => {
  const { setTitle } = useGlobalContext();
  setTitle('Flood Information List')
  const data = [
    { value: EInformationStatus.ALL, label: "All" },
    { value: EInformationStatus.APPROVED, label: "Approved" },
    { value: EInformationStatus.PENDING, label: "Pending" },
    { value: EInformationStatus.DECLINED, label: "Declined" },
  ];
  const [filter, setFilter] = useState<EInformationStatus>(
    EInformationStatus.ALL
  );
  const [search, setSearch] = useState("");

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
      <div style={{ fontSize: Size.L }}>Flood Information List</div>
      <div>
        The list flood information from users need to review within 15 minutes
        since users submit their information!{" "}
      </div>
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
          <SelectBar<EInformationStatus>
            options={data}
            defaultValue={EInformationStatus.ALL}
            setSelectedValue={setFilter}
          />
        </div>
      </div>
      <div
        style={{
          backgroundColor: "white",
          display: "flex",
          flex: 1,
          overflow: "hidden",
        }}
      >
        <FloodInformationTable filter={filter} search={search} />
      </div>
    </div>
  );
};

export default FloodInformation;
