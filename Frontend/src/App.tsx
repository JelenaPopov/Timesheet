import "bootstrap/dist/css/bootstrap.css";
import './App.css';
import Sidebar from "./app/sidebar/Sidebar";
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from "react";
import routes, { Roles, Tabs } from "./routes";
import { ToastContainer } from 'react-toastify';
import { SignIn } from "./features/auth/sign-in/SignIn";
import useLocalStorage from "./app/custom-hooks/LocalStorage";
import { SignOut } from "./features/auth/sign-out/SignOut";

function App() {
  const [activeTabVal, setActiveTab] = useState(Tabs.TIMESHEET);
  const location = useLocation();

  const setToken = useLocalStorage("token", null)[1];
  const [user, setUser] = useLocalStorage("user", null);

  useEffect(() => {
    const activeRoute = routes.find(el => el.path === location.pathname);
    if (activeRoute) {
      setActiveTab(activeRoute.key);
    }
  }, [location.key, location.pathname]);

  const routeItems = user && user.roles[0] ?
    routes.filter(route => route.roles.includes(user.roles[0] as Roles)).map((route) => (
      <Route key={route.key} path={route.path} element={route.component} />
    )) : <></>;

  const signOutComponent = <SignOut setToken={setToken} setUser={setUser}/>;
  
  return (
    <div className="App">
      {
        !user && <><SignIn setToken={setToken} setUser={setUser} /></>
      }

      {
        user &&
        <div className="row height-100 m-0">
          <div className="col-2 p-0">
            <Sidebar activeTab={activeTabVal} role={user.roles[0]} signOutComponent = {signOutComponent} />
          </div>
          <div className="col-10 pl-0 main-panel">
            <div className="p-3 header-container border-bottom">
              <span className="header-title">{activeTabVal}</span>
            </div>
            <div className="p-5">
              <Routes>
                {routeItems}
                <Route key="default" path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
            <ToastContainer />
          </div>
        </div>
      }
    </div>
  );
}

export default App;
