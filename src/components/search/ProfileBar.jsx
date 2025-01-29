import {
  Avatar,
  Button,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProfileBar = ({ e }) => {
  const { darkmode } = useSelector((state) => state.service);
  const _700 = useMediaQuery("(min-width:700px)");
  return (
    <>
      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        px={1}
        py={2}
        mx={"auto"}
        boxShadow={"5px 5px 5px gray"}
        borderRadius={"15px"}
        width={_700 ? "80%" : "90%"}
        maxWidth={"700px"}
        sx={{
          ":hover": {
            cursor: "pointer",
          },
        }}
      >
        <Stack flexDirection={"row"} gap={2}>
          <Avatar src={e ? e.profilePic : ""} alt={e ? e.username : ""} />

          <Stack flexDirection={"column"}>
            <Link to={`/profile/threads/${e._id}`} className="link">
              <Typography
                variant="h6"
                fontWeight={"bold"}
                fontSize={_700 ? "1rem" : "0.9rem"}
              >
                {e ? e.username : ""}
              </Typography>
            </Link>
            <Typography
              variant="caption"
              fontSize={_700 ? "1.1rem" : "0.75rem"}
              color={"gray"}
            >
              {e ? e.bio : ""}
            </Typography>
            <Typography variant="caption" fontSize={_700 ? "1rem" : "0.9rem"}>
              {e ? e.followers.length : 0}{" "}
              {e.followers.length === 0
                ? "followers"
                : e.followers.length > 1
                ? "followers"
                : "follower"}
            </Typography>
          </Stack>
        </Stack>
        <Link to={`/profile/threads/${e._id}`} className="link">
          <Button
            size="medium"
            sx={{
              border: "1px solid gray",
              color: darkmode ? "whitesmoke" : "black",
              borderRadius: "10px",
              p: 2,
              height: 40,
            }}
          >
            Follow
          </Button>
        </Link>
      </Stack>
    </>
  );
};

export default ProfileBar;
