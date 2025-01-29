import {
  Avatar,
  Button,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addPostModal } from "../../redux/slice";

const Input = () => {
  const { myInfo } = useSelector((state) => state.service);
  const _700 = useMediaQuery("(min-width:700px)");
  const dispatch = useDispatch();
  const handleOpenModel = () => {
    dispatch(addPostModal(true));
  };
  return (
    <>
      {_700 ? (
        <Stack
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          height={28}
          width={"70%"}
          p={3}
          borderBottom={"2px solid gray"}
          my={5}
          mx={"auto"}
          onClick={handleOpenModel}
        >
          <Stack flexDirection={"row"} gap={2} alignItems={"center"}>
            <Avatar
              src={myInfo ? myInfo.profilePic : ""}
              alt={myInfo ? myInfo.username : ""}
            />
            <Typography color={"GrayText"}>Start a thread...</Typography>
          </Stack>
          <Button
            size="medium"
            sx={{
              bgcolor: "gray",
              color: "aliceblue",
              ":hover": {
                bgcolor: "black",
              },
            }}
          >
            Post
          </Button>
        </Stack>
      ) : null}
    </>
  );
};

export default Input;
