import { Menu, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleMyMenu } from "../../redux/slice";
import { useDeletePostMutation } from "../../redux/service";
import { useEffect } from "react";
import { toast, Bounce } from "react-toastify";

const MyMenu = () => {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(toggleMyMenu(null));
  };
  const { anchorE2, postId } = useSelector((state) => state.service);

  const [deletePost, deletePostData] = useDeletePostMutation();
  const handleDeletePost = async () => {
    handleClose();
    await deletePost(postId);
  };

  useEffect(() => {
    if (deletePostData.isSuccess) {
      toast.success(deletePostData.data.msg, {
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
    if (deletePostData.isError) {
      toast.error(deletePostData.error.data.msg, {
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
  }, [deletePostData.isSuccess, deletePostData.isError]);
  return (
    <>
      <Menu
        anchorEl={anchorE2}
        open={anchorE2 !== null ? true : false}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleDeletePost}>Delete</MenuItem>
      </Menu>
    </>
  );
};

export default MyMenu;
