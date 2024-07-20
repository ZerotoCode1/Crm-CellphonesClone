import { LOCAL_STORAGE_KEYS } from "@/constants/localStorageKeys";
import httpServices from "@/services/httpServices";

export const requestBaseApi = (props: { sessionId?: string; token?: string; wsCode: string; wsRequest?: string }) => {
  const { sessionId, token, wsCode, wsRequest } = props;
  return {
    sessionId: sessionId ?? httpServices.getUserStorage()?.session ?? "",
    token: token ?? httpServices.getUserStorage()?.token ?? "",
    wsCode: wsCode ?? "",
    wsRequest: wsRequest ?? {},
  };
};

export const checkPassword = (password: string): boolean => {
  const newArray: string[] = password.split("");
  const isAscending: boolean = newArray.every((val: string, index: number) => +val - index === 1);
  const allEqual: boolean = newArray.every((val: string) => val === newArray[0]);
  return isAscending || allEqual ? false : true;
};

export const exportFileBase64 = (base64String: string, nameFile: string) => {
  const byteCharacters = atob(base64String);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = nameFile || "DSGC.xlsx";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportFile = (link: string) => {
  const linkSource = link;
  const downloadLink = document.createElement("a");
  downloadLink.href = linkSource;
  downloadLink.click();
};
export const decodeRole = () => {
  const role = sessionStorage.getItem(LOCAL_STORAGE_KEYS.ROLE) && JSON.parse(atob(sessionStorage.getItem(LOCAL_STORAGE_KEYS.ROLE) || ""));
  return role?.roleId;
};

export const CheckRoleV2 = (role: string[]) => {
  return role.includes(decodeRole());
};
export const showPrice = (value: string) => {
  if (value) {
    return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " đ";
  }
  return 0;
};
