import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import FooterComponent from "./components/FooterComponent/FooterComponent";
import { routes } from "./routes";
import { isJsonString } from "./utils";
import { jwtDecode } from "jwt-decode";
import * as UserService from "./services/UserService";
import { useDispatch, useSelector } from "react-redux";
import { resetUser, updateUser } from "./redux/slices/userSlice";
import Loading from "./components/LoadingComponent/LoadingComponent";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import AccessDeniedPage from "./pages/User/AccessDeniedPage/AccessDeniedPage";


function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user);
  console.log("User info:", user);


  useEffect(() => {
    setIsLoading(true);
    const { storageData, decoded } = handleDecoded();
    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, storageData);
    }
    setIsLoading(false);
  }, []);

  const handleDecoded = () => {
    let storageData =
      user?.access_token || localStorage.getItem("access_token");
    let decoded = {};
    if (storageData && isJsonString(storageData) && !user?.access_token) {
      storageData = JSON.parse(storageData);
      decoded = jwtDecode(storageData);
    }
    return { decoded, storageData };
  };

  UserService.axiosJWT.interceptors.request.use(
    async (config) => {
      const currentTime = new Date();
      const { decoded } = handleDecoded();
      let storageRefreshToken = localStorage.getItem("refresh_token");
      const refreshToken = JSON.parse(storageRefreshToken);
      const decodedRefreshToken = jwtDecode(refreshToken);

      if (decoded?.exp < currentTime.getTime() / 1000) {
        if (decodedRefreshToken?.exp > currentTime.getTime() / 1000) {
          const data = await UserService.refreshToken(refreshToken);
          config.headers["token"] = `Bearer ${data?.access_token}`;
        } else {
          dispatch(resetUser());
        }
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );


  const handleGetDetailsUser = async (id, token) => {
    let storageRefreshToken = localStorage.getItem("refresh_token");
    const refreshToken = JSON.parse(storageRefreshToken);
    const res = await UserService.getDetailsUser(id, token);
    dispatch(
      updateUser({
        ...res?.data,
        access_token: token,
        refreshToken: refreshToken,
      })
    );
  };
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Loading isLoading={isLoading}>
        <Router>
          <Routes>
            {routes.map((route) => {
              if (route.children) {
                const Layout = route.layout;

                // Nếu là route yêu cầu đăng nhập và phân quyền
                if (route.isPrivated) {
                  return (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={
                        <PrivateRoute
                          allowedRoles={route.allowedRoles}
                          userRole={user?.role} // 👈 truyền đúng role vào đây
                          user={user?.user} // có thể giữ lại nếu PrivateRoute cần thêm info
                        />
                      }
                    >
                      <Route element={<Layout />}>
                        {route.children.map((child) => {
                          const ChildPage = child.page;
                          return (
                            <Route
                              key={child.path}
                              path={child.path}
                              element={<ChildPage />}
                            />
                          );
                        })}
                      </Route>
                    </Route>
                  );
                }

                // Route có children nhưng không phân quyền
                return (
                  <Route path={route.path} element={<Layout />} key={route.path}>
                    {route.children.map((child) => {
                      const ChildPage = child.page;
                      return (
                        <Route
                          key={child.path}
                          path={child.path}
                          element={<ChildPage />}
                        />
                      );
                    })}
                  </Route>
                );
              }

              // Route không có children
              const Page = route.page;
              const Layout = route.isShowHeader ? DefaultComponent : Fragment;
              const ShowFooter = route.isShowFooter ? FooterComponent : Fragment;

              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <>
                      <Layout>
                        <Page />
                      </Layout>
                      <ShowFooter />
                    </>
                  }
                />
              );
            })}

            <Route path="/access-denied" element={<AccessDeniedPage />} />
          </Routes>


        </Router>
      </Loading>
    </div>
  );
}

export default App;