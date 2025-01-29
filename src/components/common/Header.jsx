import { Grid2, Stack, useMediaQuery } from "@mui/material";
import { IoMenu } from "react-icons/io5";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { toggleMainMenu } from "../../redux/slice";

const Header = () => {
  const _700 = useMediaQuery("(min-width:700px)");

  const dispatch = useDispatch();
  const handleOpenMainMenu = (e) => {
    dispatch(toggleMainMenu(e.currentTarget));
  };

  const { darkmode } = useSelector((state) => state.service);
  return (
    <>
      {_700 ? (
        <Stack
          direction={"row"}
          justifyContent={"space-around"}
          alignItems={"center"}
          position={"sticky"}
          top={0}
          height={52}
          py={1}
        >
          {darkmode ? (
            <img
              src="/Threads-logo-black-bg.webp"
              alt="logo"
              width={60}
              height={50}
            />
          ) : (
            <img
              src="/Threads-logo-white-bg.png"
              alt="logo"
              width={60}
              height={35}
            />
          )}
          <Stack
            justifyContent={"center"}
            width={"550px"}
            height={96}
            bgcolor={darkmode ? "" : "aliceblue"}
            zIndex={2}
          >
            <Navbar />
          </Stack>
          <IoMenu
            size={36}
            className="img-icon"
            color="gray"
            onClick={handleOpenMainMenu}
          />
        </Stack>
      ) : (
        <>
          <Stack
            justifyContent={"center"}
            position={"fixed"}
            bottom={0}
            bgcolor={darkmode ? "" : "aliceblue"}
            height={52}
            p={1}
            width={"100%"}
            zIndex={2}
          >
            <Navbar />
          </Stack>
          <Grid2
            container
            height={60}
            justifyContent={"flex-end"}
            alignItems={"center"}
            p={1}
          >
            <Grid2 size={{ xs: 6 }}>
              <img
                src="/Threads-logo-white-bg.png"
                alt="logo"
                width={60}
                height={35}
              />
            </Grid2>
            <IoMenu size={36} className="img-icon" color="gray" />
          </Grid2>
        </>
      )}
    </>
  );
};

export default Header;
