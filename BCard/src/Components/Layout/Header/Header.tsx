import { DarkThemeToggle, Navbar, TextInput } from "flowbite-react";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TRootState } from "../../../Store/BigPie";
import { userActions } from "../../../Store/UserSlice";
import { searchActions } from "../../../Store/SearchSlice";

const Header = () => {
  const user = useSelector((state: TRootState) => state.UserSlice.user);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const logout = () => {
    dispatch(userActions.logout());
    nav("/");
  };
  const Location = useLocation().pathname;
  console.log(Location);

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(searchActions.searchWord(value));
  };

  return (
    <Navbar fluid rounded className="bg-green-400 text-white">
      <Navbar.Brand as={Link} href="https://flowbite-react.com">
        <span className="self-center whitespace-nowrap text-xl font-semibold">
          BCard
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link
          href="/home"
          to="/home"
          active={Location === "/home" || Location === "/"}
        >
          Home
        </Navbar.Link>
        <Navbar.Link
          as={Link}
          href="/about"
          to="/about"
          active={Location === "/about"}
        >
          About
        </Navbar.Link>
        <Navbar.Brand>
          <TextInput rightIcon={CiSearch} onChange={search} />
        </Navbar.Brand>
        <DarkThemeToggle />
        {!user && (
          <Navbar.Link
            as={Link}
            href="/signup"
            to="/signup"
            active={Location === "/signup"}
          >
            SIGNUP
          </Navbar.Link>
        )}
        {!user && (
          <Navbar.Link
            as={Link}
            href="/login"
            to="/login"
            active={Location === "/login"}
          >
            LOGIN
          </Navbar.Link>
        )}

        {user && (
          <Navbar.Link as={Link} onClick={logout}>
            Sign Out
          </Navbar.Link>
        )}

        {user && (
          <Navbar.Link
            as={Link}
            to={"/profile"}
            href="/profile"
            active={Location === "/profile"}
            // className="text-white"
          >
            Profile
          </Navbar.Link>
        )}
        {user && (
          <Navbar.Link
            as={Link}
            to={"/favorites"}
            href="/favorites"
            active={Location === "/favorites"}
          >
            Favorites
          </Navbar.Link>
        )}
        {user?.isBusiness && (
          <Navbar.Link
            as={Link}
            to={"/my-cards"}
            href="/my-cards"
            active={Location === "/my-cards"}
          >
            My Cards
          </Navbar.Link>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
