import { MaskStatus } from "../entity/MaskStatus";
import { useApi } from "./useApi";

type MaskStatusResponse = MaskStatus;

export const useGetMaskStatus = () => {
  const apiSet = useApi<MaskStatusResponse, null>();
  const url = "/api/status";
  const execute = () => {
    apiSet.execute(url);
  };
  return { ...apiSet, execute };
};
