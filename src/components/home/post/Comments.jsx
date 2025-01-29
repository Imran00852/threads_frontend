import {
  Avatar,
  Stack,
  Typography,
  useMediaQuery,
  Menu,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import { IoIosMore } from "react-icons/io";
import { useSelector } from "react-redux";
import {
  useDeleteCommentMutation,
  useSinglePostQuery,
} from "../../../redux/service";
import { Bounce, toast } from "react-toastify";

const Comments = ({ e, postId }) => {
  const { darkmode, myInfo } = useSelector((state) => state.service);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isAdmin, setIsAdmin] = useState();

  const _700 = useMediaQuery("(min-width:700px)");

  const [deleteComment, deleteCommentData] = useDeleteCommentMutation();
  const { refetch } = useSinglePostQuery(postId);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDeleteComment = async () => {
    const info = {
      postId,
      id: e?._id,
    };
    await deleteComment(info);
    handleClose();
    refetch();
  };

  const checkIsAdmin = () => {
    if (e && myInfo) {
      if (e.admin._id === myInfo._id) {
        setIsAdmin(true);
        return;
      }
    }
    setIsAdmin(false);
  };

  useEffect(() => {
    checkIsAdmin();
  }, []);

  useEffect(() => {
    if (deleteCommentData.isSuccess) {
      toast.success(deleteCommentData.data.msg, {
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
    if (deleteCommentData.isError) {
      toast.error(deleteCommentData.error.data.msg, {
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
  }, [deleteCommentData.isSuccess, deleteCommentData.isError]);
  return (
    <>
      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        px={2}
        pb={4}
        borderBottom={"1px solid gray"}
        width={"90%"}
        mx={"auto"}
      >
        <Stack flexDirection={"row"} gap={_700 ? 2 : 1}>
          <Avatar
            src={e ? e.admin.profilePic : ""}
            alt={e ? e.admin.username : ""}
          />
          <Stack flexDirection={"column"}>
            <Typography variant="h6" fontSize={"0.9rem"} fontWeight={"bold"}>
              {e ? e.admin.username : ""}
            </Typography>
            <Typography variant="subtitle2" fontSize={"0.9rem"}>
              {e ? e.text : ""}
            </Typography>
          </Stack>
        </Stack>
        <Stack
          flexDirection={"row"}
          gap={1}
          alignItems={"center"}
          color={darkmode ? "white" : "GrayText"}
          fontSize={"0.9rem"}
        >
          <Typography variant="caption">24min</Typography>
          {isAdmin ? (
            <IoIosMore
              size={_700 ? 28 : 20}
              onClick={(e) => setAnchorEl(e.currentTarget)}
              className="image-icon"
            />
          ) : (
            ""
          )}
        </Stack>
      </Stack>
      <Menu
        anchorEl={anchorEl}
        open={anchorEl !== null ? true : false}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleDeleteComment}>Delete</MenuItem>
      </Menu>
    </>
  );
};

export default Comments;
