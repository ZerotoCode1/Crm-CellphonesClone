import { BaseRoute } from "@/constants/baseRoute";
import withCheckRole from "@/hocs-common/withCheckRole";
import { PERMISSION_ALL, PERMISSION_ENUM } from "@/interfaces/enum";
import React, { Fragment, lazy } from "react";

// Bash importHere
const DefaultLayout = lazy(() => import("../layouts/DefaultLayout"));
const Login = lazy(() => import("../pages/login"));
const Homepage = lazy(() => import("../pages/home"));
const Components = lazy(() => import("../pages/demo-components"));
//
const ManagementOrderInformationEsim = lazy(() => import("../pages/management-order-information-esim"));
const ManagementOrderInformationEsimError = lazy(() => import("../pages/management-order-information-esim-error"));
const CustomerManagerment = lazy(() => import("../pages/customer-management"));
const AccountManagerment = lazy(() => import("../pages/account-management"));
const ContactSkyfi = lazy(() => import("../pages/contact-skyfi"));
const DeviceManagement = lazy(() => import("../pages/device-management"));
const ListPackage = lazy(() => import("../pages/list-package"));
const ListSoldEsim = lazy(() => import("../pages/list-sold-esim"));
const ListExchangeRate = lazy(() => import("../pages/list-exchange-rate"));
const Gpay = lazy(() => import("../pages/gpay"));
const Airalo = lazy(() => import("../pages/airalo"));
const ImportFile = lazy(() => import("../pages/import-file"));
const News = lazy(() => import("../pages/news"));
const CreateNews = lazy(() => import("../pages/news/create-news"));
const NewsDetail = lazy(() => import("../pages/news/news-detail"));

interface Route {
  name: string;
  path: string;
  isPrivateRoute?: boolean;
  layout: React.LazyExoticComponent<React.MemoExoticComponent<any>> | React.ExoticComponent<any> | typeof React.Component;
  routeChild: {
    name: string;
    path: string;
    component: typeof React.Component | React.FC;
    isPrivateRoute?: boolean;
  }[];
}

const routes: Route[] = [
  {
    name: "Login Layout",
    path: BaseRoute.Login,
    layout: Fragment,
    routeChild: [
      {
        name: "Login",
        path: BaseRoute.Login,
        component: Login,
      },
    ],
  },

  {
    name: "Home Layout",
    path: BaseRoute.Homepage,
    layout: DefaultLayout,
    isPrivateRoute: true,
    routeChild: [
      {
        name: "Homepage",
        path: BaseRoute.Homepage,
        component: withCheckRole(Homepage, PERMISSION_ALL),
      },
      {
        name: "Components",
        path: BaseRoute.Components,
        component: withCheckRole(Components, PERMISSION_ALL),
      },
      {
        name: "Customer management",
        path: BaseRoute.CustomerManagement,
        component: withCheckRole(CustomerManagerment, PERMISSION_ALL),
      },
      {
        name: "Acount management",
        path: BaseRoute.AccountManagement,
        component: withCheckRole(AccountManagerment, [PERMISSION_ENUM.SYSTEMADMIN, PERMISSION_ENUM.SYSTEMOPS]),
      },
      {
        name: "List Package",
        path: BaseRoute.ListPackage,
        component: withCheckRole(ListPackage, [PERMISSION_ENUM.SYSTEMADMIN, PERMISSION_ENUM.SYSTEMOPS, PERMISSION_ENUM.SALEOPS]),
      },
      {
        name: "List Sold Esim",
        path: BaseRoute.ListSoldEsim,
        component: withCheckRole(ListSoldEsim, PERMISSION_ALL),
      },
      {
        name: "List Exchange Rate",
        path: BaseRoute.ListExchangeRate,
        component: withCheckRole(ListExchangeRate, [PERMISSION_ENUM.SYSTEMADMIN, PERMISSION_ENUM.SYSTEMOPS]),
      },
      {
        name: "Import File",
        path: BaseRoute.ImportFile,
        component: withCheckRole(ImportFile, [PERMISSION_ENUM.SYSTEMADMIN, PERMISSION_ENUM.SALEOPS]),
      },
      {
        name: "CreateNews",
        path: BaseRoute.CreateNews,
        component: withCheckRole(CreateNews, PERMISSION_ALL),
      },
      {
        name: "NewsDetail",
        path: BaseRoute.NewsDetail,
        component: withCheckRole(NewsDetail, PERMISSION_ALL),
      },
    ],
  },

  {
    name: "Management order info ",
    path: BaseRoute.ManagementOrderInformation,
    layout: DefaultLayout,
    routeChild: [
      {
        name: "Esim",
        path: BaseRoute.ManagementOrderInformationEsim,
        component: withCheckRole(ManagementOrderInformationEsim, PERMISSION_ALL),
      },
      {
        name: "Esim Error",
        path: BaseRoute.ManagementOrderInformationEsimError,
        component: withCheckRole(ManagementOrderInformationEsimError, PERMISSION_ALL),
      },
    ],
  },
  {
    name: "Portal Management",
    path: BaseRoute.PortalManagement,
    layout: DefaultLayout,
    routeChild: [
      {
        name: "Contact skyfi",
        path: BaseRoute.ContactsSkyfi,
        component: withCheckRole(ContactSkyfi, PERMISSION_ALL),
      },
      {
        name: "Device management",
        path: BaseRoute.DeviceManagement,
        component: withCheckRole(DeviceManagement, PERMISSION_ALL),
      },
      {
        name: "News",
        path: BaseRoute.News,
        component: withCheckRole(News, PERMISSION_ALL),
      },
    ],
  },
  {
    name: "Control management",
    path: BaseRoute.ControlManagement,
    layout: DefaultLayout,
    routeChild: [
      {
        name: "Gpay",
        path: BaseRoute.Gpay,
        component: withCheckRole(Gpay, [PERMISSION_ENUM.SYSTEMADMIN, PERMISSION_ENUM.SYSTEMOPS, PERMISSION_ENUM.SALEOPS]),
      },
      {
        name: "Airalo",
        path: BaseRoute.Airalo,
        component: withCheckRole(Airalo, [PERMISSION_ENUM.SYSTEMADMIN, PERMISSION_ENUM.SYSTEMOPS, PERMISSION_ENUM.SALEOPS]),
      },
    ],
  },
];

export default routes;
