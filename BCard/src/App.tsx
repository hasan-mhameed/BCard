import Footer from "./Components/Layout/Footer/Footer";
import Header from "./Components/Layout/Header/Header";
import { Route, Routes } from "react-router-dom";
import About from "./Pages/About/About";
import Home from "./Pages/Home/Home";
import Error from "./Pages/Error";
import SignUp from "./Pages/SignUp/SignUp";
import Login from "./Pages/Login/Login";
import RouteGuard from "./Components/Shared/RouteGuard";
import { useSelector } from "react-redux";
import { TRootState } from "./Store/BigPie";
import Profile from "./Pages/Profile/Profile";
import CardDetails from "./Pages/CardDetails/CardDetails";
import Favorites from "./Pages/Favorites/Favorites";
import MyCards from "./Pages/MyCards/MyCards";
import CreateCard from "./Pages/CreateCard/CreateCard";
import EditCard from "./Pages/EditCard/EditCard";

function App() {
  const user = useSelector((state: TRootState) => state.UserSlice.user);
  return (
    <div className="h-full dark:bg-slate-600">
      <Header />
      {
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/card/:id" element={<CardDetails />} />
          <Route
            path="/profile"
            element={
              <RouteGuard user={user!}>
                <Profile />
              </RouteGuard>
            }
          />
          <Route
            path="/favorites"
            element={
              <RouteGuard user={user!}>
                <Favorites />
              </RouteGuard>
            }
          />
          <Route
            path="/my-cards"
            element={
              <RouteGuard user={user!}>
                <MyCards />
              </RouteGuard>
            }
          />
          <Route
            path="create-card"
            element={
              <RouteGuard user={user!}>
                <CreateCard />
              </RouteGuard>
            }
          />
          <Route
            path="/edit-card/:id"
            element={
              <RouteGuard user={user!}>
                <EditCard />
              </RouteGuard>
            }
          />
          <Route path="/*" element={<Error />} />
        </Routes>
      }
      <div className="sticky bottom-0">
        <Footer />
      </div>
    </div>
  );
}

export default App;
