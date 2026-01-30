import type { AxiosResponse } from "axios";

export const unwrap = <T>(promise: Promise<AxiosResponse<T>>) =>
  promise.then((response) => response.data);
