import "./App.css";
// import "antd/dist/antd.css";
import { BrowserRouter as Router, Outlet, Route, Routes } from "react-router-dom";
import routes from "./routes/routes";
import { Suspense } from "react";
import PrivateRoute from "./components/PrivateRoute";
import { ErrorBoundary } from "react-error-boundary";
import Page404 from "./pages/Page404";
import StateGlobalProvider from "./providers/StateGlobalProvider";
import AuthenticationProvider from "./providers/AuthenticationProvider";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n/config";
import LoadingPageService from "./services/loadingPage";
import PopupService from "./services/popupPage";
import PushUpService from "./services/pushUpPage";
import React from "react";
import LoadingPageGlobal, { GlobalLoadingPage } from "./components/global/loading";
import GlobalPopupConfirm, { GlobalPopupConfirmRef } from "./components/global/popup";
import GlobalPushUpConfirm, { GlobalPushUpConfirmRef } from "./components/global/push-up";
import "react-toastify/dist/ReactToastify.css";
import { Slide, ToastContainer } from "react-toastify";
import { ConfigProvider } from "antd";
import viVN from "antd/locale/vi_VN";
import dayjs from "dayjs";
import "dayjs/locale/vi";
dayjs.locale("vi");
const ErrorFallback = ({ error, resetErrorBoundary }: any) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

function App() {
  PopupService.instance = React.useRef<GlobalPopupConfirmRef | any>(null);
  PushUpService.instance = React.useRef<GlobalPushUpConfirmRef | any>(null);
  LoadingPageService.instance = React.useRef<GlobalLoadingPage | any>(null);

  const renderContent = () => {
    return (
      <>
        <Router>
          <Routes>
            {routes.map((route) => {
              return (
                <Route
                  key={`${route.path}-layout`}
                  path={route.path}
                  element={
                    <Suspense>
                      {route.isPrivateRoute ? (
                        <PrivateRoute>
                          <route.layout>
                            <Outlet />
                          </route.layout>
                        </PrivateRoute>
                      ) : (
                        <route.layout>
                          <Outlet />
                        </route.layout>
                      )}
                    </Suspense>
                  }
                >
                  {route.routeChild.map((child, idx) => {
                    return (
                      <Route
                        key={`${child.path}-${idx}`}
                        path={child.path}
                        element={
                          <Suspense>
                            <ErrorBoundary FallbackComponent={ErrorFallback}>
                              {child.isPrivateRoute ? (
                                <PrivateRoute>
                                  <child.component />
                                </PrivateRoute>
                              ) : (
                                <child.component />
                              )}
                            </ErrorBoundary>
                          </Suspense>
                        }
                      />
                    );
                  })}
                </Route>
              );
            })}

            <Route path="*" element={<Page404 />} />
          </Routes>
          <LoadingPageGlobal ref={LoadingPageService.instance} />
          <GlobalPopupConfirm ref={PopupService.instance} />
          <GlobalPushUpConfirm ref={PushUpService.instance} />
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={true}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            transition={Slide}
          />
        </Router>
      </>
    );
  };

  return (
    <I18nextProvider i18n={i18n}>
      <ConfigProvider locale={viVN}>
        <StateGlobalProvider>
          <AuthenticationProvider>{renderContent()}</AuthenticationProvider>
        </StateGlobalProvider>
      </ConfigProvider>
    </I18nextProvider>
  );
}

export default App;
