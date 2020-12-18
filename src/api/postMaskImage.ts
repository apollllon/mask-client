import { usePostApi, BaseResponse } from "./useApi";
import { MaskMode } from "../entity/MaskMode";

type MaskImageResponse = { file: File } & BaseResponse;

export const usePostMaskImage = () => {
  const apiSet = usePostApi<MaskImageResponse, MaskMode>();
  const url = "/api/image";
  const execute = (formObject: MaskMode) => {
    apiSet.execute(url, formObject);
  };
  return { ...apiSet, execute };
};
