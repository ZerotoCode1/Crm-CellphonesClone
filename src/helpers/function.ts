import { PERMISSION_ENUM } from "@/interfaces/enum";
import { useAuth } from "@/providers/AuthenticationProvider";

export const getBase64 = (img: any, callback: any) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
export const getBase64UploadCk = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const CheckRoleAction = (permission: (PERMISSION_ENUM | "" | string)[]) => {
  const { user } = useAuth();
  const role = user.roleId ?? PERMISSION_ENUM.SYSTEMADMIN;
  return permission?.includes(role);
};
export function getCookie(name: string) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

export function setCookie(name: string, value: any, days: number) {
  const expires = days ? `; expires=${new Date(Date.now() + days * 864e5).toUTCString()}` : "";
  document.cookie = `${name}=${value || ""}${expires}; path=/`;
}
export function deleteCookie(name: string) {
  document.cookie = `${name}=; Max-Age=0; path=/`;
}
