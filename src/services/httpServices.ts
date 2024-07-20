import { ROOT_URL } from "@/constants/apiUrl";
import { LOCAL_STORAGE_KEYS } from "@/constants/localStorageKeys";
import i18n from "@/i18n/config";
import { UserInfos } from "@/interfaces/common";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

class Services {
  axios: AxiosInstance;

  constructor() {
    this.axios = axios;
    this.axios.defaults.withCredentials = false;
    this.axios.defaults.baseURL = ROOT_URL;
    //! Interceptor request
    this.axios.interceptors.request.use(
      function (config) {
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    //! Interceptor response
    this.axios.interceptors.response.use(
      function (config) {
        if (config.data.errorCode === "S401") {
          window.localStorage.clear();
          window.location.reload();
        }

        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
  }

  attachTokenToHeader(token: string) {
    this.axios.interceptors.request.use(
      function (config) {
        if (config.headers) {
          // Do something before request is sent
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
  }

  setupInterceptors() {
    this.axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        const { status } = error?.response || {};
        if (status === 401) {
          window.localStorage.clear();
          window.location.reload();
        }

        return Promise.reject(error);
      }
    );
  }

  get(url: string, config?: AxiosRequestConfig) {
    return this.axios.get(url, config);
  }

  post(url: string, data: any, _config?: AxiosRequestConfig) {
    return this.axios.post(url, data, {
      headers: { "Accept-Language": i18n.language },
    });
  }

  delete(url: string, config?: AxiosRequestConfig) {
    return this.axios.delete(url, config);
  }

  put(url: string, data: any, config?: AxiosRequestConfig) {
    return this.axios.put(url, data, config);
  }

  saveTokenStorage(token: string) {
    localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, token);
  }

  getTokenStorage() {
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);
    return token || "";
  }

  clearStorage() {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
  }

  saveUserStorage(user: UserInfos) {
    localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(user));
  }

  getUserStorage() {
    if (localStorage.getItem(LOCAL_STORAGE_KEYS.USER)) {
      return JSON.parse(localStorage?.getItem(LOCAL_STORAGE_KEYS.USER) || "") as UserInfos;
    }

    return null;
  }
}

export default new Services();
