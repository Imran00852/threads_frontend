import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { editProfileModal } from "../../redux/slice";
import { useParams } from "react-router-dom";
import Loader from "../../components/common/Loader";
import { toast, Bounce } from "react-toastify";
import {
  useUpdateProfileMutation,
  useUserDetailsQuery,
} from "../../redux/service";

const EditProfile = () => {
  const [pic, setPic] = useState();
  const [bio, setBio] = useState();

  const imageRef = useRef();
  const dispatch = useDispatch();
  const params = useParams();

  const _700 = useMediaQuery("(min-width:700px)");

  const [updateProfile, updateProfileData] = useUpdateProfileMutation();
  const { refetch } = useUserDetailsQuery(params?.id);

  const handleClose = () => {
    dispatch(editProfileModal(false));
  };
  const { openEditProfileModal, myInfo } = useSelector(
    (state) => state.service
  );
  const handlePhoto = () => {
    imageRef.current.click();
  };
  const handleUpdate = async () => {
    if (pic || bio) {
      const data = new FormData();
      if (bio) {
        data.append("text", bio);
      }
      if (pic) {
        data.append("media", pic);
      }
      await updateProfile(data);
    }
    dispatch(editProfileModal(false));
  };

  useEffect(() => {
    if (updateProfileData.isSuccess) {
      refetch();
      toast.success(updateProfileData.data.msg, {
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
    if (updateProfileData.isError) {
      toast.error(updateProfileData.error.data.msg, {
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
  }, [updateProfileData.isSuccess, updateProfileData.isError]);
  return (
    <>
      <Dialog
        open={openEditProfileModal}
        onClose={handleClose}
        fullWidth
        fullScreen={_700 ? false : true}
      >
        {updateProfileData.isLoading ? (
          <Stack height={"60vh"}>
            <Loader />
          </Stack>
        ) : (
          <>
            <Box
              position={"absolute"}
              top={20}
              right={20}
              onClick={handleClose}
            >
              <RxCross2 size={28} className="image-icon" />
            </Box>
            <DialogTitle textAlign={"center"} mb={5}>
              Edit Profile
            </DialogTitle>
            <DialogContent>
              <Stack flexDirection={"column"} gap={1}>
                <Avatar
                  src={
                    pic
                      ? URL.createObjectURL(pic)
                      : myInfo
                      ? myInfo.profilePic
                      : ""
                  }
                  alt={myInfo ? myInfo.username : ""}
                  sx={{
                    width: 96,
                    height: 96,
                    alignSelf: "center",
                  }}
                />
                <Button
                  size="large"
                  sx={{
                    border: "2px solid gray",
                    borderRadius: "10px",
                    width: 96,
                    height: 40,
                    alignSelf: "center",
                    my: 2,
                  }}
                  onClick={handlePhoto}
                >
                  Change
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  className="file-input"
                  ref={imageRef}
                  onChange={(e) => setPic(e.target.files[0])}
                />
                <Typography
                  variant="subtitle1"
                  fontWeight={"bold"}
                  fontSize={"1.2rem"}
                >
                  Username
                </Typography>
                <input
                  type="text"
                  value={myInfo ? myInfo.username : ""}
                  readOnly
                  className="text1"
                />
              </Stack>
              <Stack flexDirection={"column"} gap={1}>
                <Typography
                  variant="subtitle1"
                  fontWeight={"bold"}
                  fontSize={"1.2rem"}
                >
                  Email
                </Typography>
                <input
                  type="text"
                  value={myInfo ? myInfo.email : ""}
                  readOnly
                  className="text1"
                />
              </Stack>
              <Stack flexDirection={"column"} gap={1}>
                <Typography
                  variant="subtitle1"
                  fontWeight={"bold"}
                  fontSize={"1.2rem"}
                >
                  Bio
                </Typography>
                <input
                  type="text"
                  className="text1"
                  placeholder={myInfo ? myInfo.bio : ""}
                  value={bio ? bio : ""}
                  onChange={(e) => setBio(e.target.value)}
                />
              </Stack>
              <Button
                size="large"
                sx={{
                  border: "2px solid gray",
                  borderRadius: "10px",
                  bgcolor: "GrayText",
                  color: "white",
                  width: "100%",
                  my: 2,
                  fontSize: "1.2rem",
                  ":hover": {
                    bgcolor: "gray",
                  },
                }}
                onClick={handleUpdate}
              >
                Update
              </Button>
            </DialogContent>
          </>
        )}
      </Dialog>
    </>
  );
};

export default EditProfile;
