import { EInformationStatus } from "../utils/enum";
import { IFloodInformation } from "../utils/types";

const API_BASE_URL =
  "https://flood-information-service.onrender.com/flood-information";

export const getListFloodInformationService = async ({
  status,
  search,
}: { status?: EInformationStatus; search?: string } = {}): Promise<
  IFloodInformation[]
> => {
  const url = new URL(`${API_BASE_URL}`);

  if (status !== EInformationStatus.ALL) {
    url.searchParams.append("status", String(status));
  }

  if (search) {
    url.searchParams.append("search", search);
  }

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error("Failed to fetch flood information list");
  }
  return await response.json();
};

export const updateFloodInformationService = async ({
  id,
  data,
}: { id: string, data: IFloodInformation}): Promise<IFloodInformation> => {
  const url = new URL(`${API_BASE_URL}/${id}`);

  const response = await fetch(url.toString(), {
    method: 'PUT',  
    headers: {
      'Content-Type': 'application/json',  
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update flood information");
  }

  return await response.json(); 
};