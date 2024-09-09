import { create } from "lodash";

export const path = {
  managementOrderInformation: "/management-order-information",
  esim: "/esim",
  esimError: "/esim-error",
  customerManagement: "/customer-management",
  accountManagement: "/account-management",
  portalManagement: "/portal-management",
  contactSkyfi: "/contact-skyfi",
  deviceManagement: "/device-management",
  category: "/category",
  listproduct: "/listproduct",
  listExchangeRate: "/list-exchange-rate",
  controlManagement: "/control-management",
  gpay: "/gpay",
  airalo: "/airalo",
  createProduct: "/create-product",
  editProduct: "/edit-product",
  shopManagement: "/shop-managerment",
};

export const BaseRoute = {
  Homepage: "/",
  Login: "/login",
  Components: "/components",
  //
  ManagementOrderInformation: path.managementOrderInformation,
  ManagementOrderInformationEsim: `${path.managementOrderInformation}${path.esim}`,
  ManagementOrderInformationEsimError: `${path.managementOrderInformation}${path.esimError}`,
  //
  CustomerManagement: path.customerManagement,
  //
  AccountManagement: path.accountManagement,
  //
  PortalManagement: path.portalManagement,
  ContactsSkyfi: `${path.portalManagement}${path.contactSkyfi}`,
  DeviceManagement: `${path.portalManagement}${path.deviceManagement}`,
  //
  Category: path.category,
  //
  ListProduct: path.listproduct,
  //
  ListExchangeRate: path.listExchangeRate,
  //
  ControlManagement: path.controlManagement,
  Gpay: `${path.controlManagement}${path.gpay}`,
  Airalo: `${path.controlManagement}${path.airalo}`,
  ImportFile: "/import-file",
  News: `${path.portalManagement}/news`,
  CreateNews: `${path.portalManagement}/news/create-news`,
  NewsDetail: `${path.portalManagement}/new/news-detail/:id`,
  CreateProduct: path.createProduct,
  EditProduct: path.editProduct,
  ShopManagement: "/shop-managerment",

};
export const RouterDynamic = {
  NewsDetail: `${path.portalManagement}/new/news-detail`,
};
