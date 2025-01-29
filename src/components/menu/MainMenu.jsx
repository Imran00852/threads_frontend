import { Menu, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addMyInfo, toggleColorMode, toggleMainMenu } from "../../redux/slice";
import { useLogoutMutation } from "../../redux/service";
import { useEffect } from "react";
import { toast, Bounce } from "react-toastify";

const MainMenu = () => {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(toggleMainMenu(null));
  };

  const { anchorE1, myInfo } = useSelector((state) => state.service);
  const [logout, logoutData] = useLogoutMutation();

  const handleToggleTheme = () => {
    handleClose();
    dispatch(toggleColorMode());
  };
  const handleLogout = async () => {
    handleClose();
    await logout();
  };
  useEffect(() => {
    if (logoutData.isSuccess) {
      addMyInfo(null);
      toast.success(logoutData.data.msg, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
    }
    if (logoutData.isError) {
      toast.error(logoutData.error.data.msg, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
    }
  }, [logoutData.isError, logoutData.isSuccess]);
  return (
    <>
      <Menu
        anchorEl={anchorE1}
        open={anchorE1 !== null ? true : false}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleToggleTheme}>Toggle Theme</MenuItem>
        <Link to={`/profile/threads/${myInfo?._id}`} className="link">
          <MenuItem>My Profile</MenuItem>
        </Link>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default MainMenu;
