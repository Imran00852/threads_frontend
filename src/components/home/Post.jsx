import { Stack, Typography, useMediaQuery } from "@mui/material";
import { IoIosMore } from "react-icons/io";
import PostOne from "./post/PostOne";
import PostTwo from "./post/PostTwo";
import { useDispatch, useSelector } from "react-redux";
import { addPostId, toggleMyMenu } from "../../redux/slice";
import { useEffect, useState } from "react";

const Post = ({ item }) => {
  const { darkmode, myInfo } = useSelector((state) => state.service);
  const _700 = useMediaQuery("(min-width:700px)");
  const _400 = useMediaQuery("(min-width:400px)");
  const _300 = useMediaQuery("(min-width:300px)");

  const dispatch = useDispatch();
  const handleOpenMyMenu = (e) => {
    dispatch(addPostId(item._id));
    dispatch(toggleMyMenu(e.currentTarget));
  };
  const [isAdmin, setIsAdmin] = useState();

  const checkAdmin = () => {
    if (item?.admin?._id && myInfo?._id && item.admin._id === myInfo._id) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    if (item && myInfo) {
      checkAdmin();
    }
  }, [item, myInfo]);
  return (
    <>
      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        width={_700 ? "70%" : _300 ? "90%" : "100%"}
        mx={"auto"}
        borderBottom={"3px solid gray"}
        p={_700 ? 2 : _400 ? 1 : "5px"}
        sx={{
          cursor: "pointer",
          ":hover": {
            boxShadow: _700 ? "10px 10px 10px gray" : "",
          },
          transition: "all ease-in-out 0.4s",
        }}
      >
        <Stack flexDirection={"row"} gap={_700 ? 2 : 1}>
          <PostOne item={item} />
          <PostTwo item={item} />
        </Stack>

        <Stack flexDirection={"row"} justifyContent={"center"} gap={1}>
          <Typography
            fontSize={"1rem"}
            variant="caption"
            color={darkmode ? "white" : "GrayText"}
            position={"relative"}
            top={2}
          >
            24d
          </Typography>
          {isAdmin && (
            <IoIosMore size={_700 ? 28 : 20} onClick={handleOpenMyMenu} />
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default Post;
