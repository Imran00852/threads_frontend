import {
  Avatar,
  AvatarGroup,
  Badge,
  Stack,
  Stepper,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";

const PostOne = ({ item }) => {
  const _700 = useMediaQuery("(min-width:700px)");
  return (
    <>
      <Stack
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Link to={`/profile/threads/${item?.admin?._id}`}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <Avatar
                alt="+"
                src=""
                sx={{
                  width: _700 ? 20 : 14,
                  height: _700 ? 20 : 14,
                  bgcolor: "green",
                  position: _700 ? "relative" : "initial",
                  right: _700 ? 4 : 0,
                  bottom: _700 ? 4 : 0,
                }}
              >
                {""}+{""}
              </Avatar>
            }
          >
            <Avatar
              alt={item ? item.admin?.username : ""}
              src={item ? item.admin?.profilePic : ""}
              sx={{
                width: _700 ? 40 : 32,
                height: _700 ? 40 : 32,
              }}
            />
          </Badge>
        </Link>
        <Stack
          flexDirection={"column"}
          alignItems={"center"}
          gap={2}
          height={"100%"}
        >
          {/* stepper to create vertical line */}
          <Stepper
            orientation="vertical"
            activeStep={0}
            sx={{
              border: "0.1rem solid gray",
              width: "0px",
              height: "100%",
            }}
          ></Stepper>

          {/* Avatar group for multiple avatars */}
          {item ? (
            item.comments.length > 0 ? (
              <AvatarGroup
                total={item?.comments.length}
                sx={{
                  "& .MuiAvatar-root": {
                    width: _700 ? 24 : 16,
                    height: _700 ? 24 : 16,
                    fontSize: _700 ? 12 : 8,
                  },
                }}
              >
                <Avatar
                  src={item?.comments[0].admin.profilePic}
                  alt={item?.comments[0].admin.username}
                />
                {item.comments.length > 1 ? (
                  <Avatar
                    src={item?.comments[1].admin.profilePic}
                    alt={item?.comments[1].admin.username}
                  />
                ) : null}
              </AvatarGroup>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default PostOne;
