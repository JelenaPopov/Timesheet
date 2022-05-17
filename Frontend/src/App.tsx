import "bootstrap/dist/css/bootstrap.css";
import './App.css';
import Sidebar from "./app/sidebar/Sidebar";
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from "react";
import routes, { Roles, Tabs } from "./routes";
import { ToastContainer } from 'react-toastify';
import { SignIn } from "./features/auth/sign-in/SignIn";
import { SignOut } from "./features/auth/sign-out/SignOut";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { setNewValue } from "./features/auth/authSlice";
import { ProjectDetails } from "./features/projects/project-details/ProjectDetails";

function App() {
  const [activeTabVal, setActiveTab] = useState(Tabs.TIMESHEET);
  const location = useLocation();
  const dispatch = useAppDispatch();

  const authInfo = useAppSelector((state) => state.auth);

  useEffect(() => {
    if ((!authInfo || !authInfo.token) && window.localStorage.getItem('token')) {
      dispatch(setNewValue(window.localStorage.getItem('token')));
    }
  }, [authInfo, dispatch]);

  useEffect(() => {
    let activeRoute = routes.find(el => el.path === location.pathname);
    if(location.pathname.includes("/projects")){
      activeRoute = routes.find(el => el.key === Tabs.PROJECTS);
    }
    if (activeRoute) {
      setActiveTab(activeRoute.key);
    }
  }, [location.key, location.pathname]);

  let routeItems = authInfo.user && authInfo.user.roles[0] ?
    routes.filter(route => route.roles.includes(authInfo.user?.roles[0] as Roles)).map((route) => (
      <Route key={route.key} path={route.path} element={route.component} />
    )) : <></>;

  const signOutComponent = <SignOut />;

  return (
    <div className="App">
      {
        !authInfo.user && <><SignIn /></>
      }

      {
        authInfo.user &&
        <div className="row height-100 m-0">
          <div className="col-2 p-0">
            <Sidebar activeTab={activeTabVal} role={authInfo.user.roles[0]} signOutComponent={signOutComponent} />
          </div>
          <div className="col-10 pl-0 main-panel">
            <div className="p-3 header-container border-bottom">
              <span className="header-title">{activeTabVal}</span>
            </div>
            <div className="p-5">
              <Routes>
                {routeItems}
                <Route key="projectInfo" path="/projects/:projectId" element={<ProjectDetails/>} />
                <Route key="default" path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
            <ToastContainer position = "top-center" />
          </div>
        </div>
      }
    </div>
  );
}

export default App;
