import { Stack, Typography, useMediaQuery } from "@mui/material";
import Post from "../../../components/home/Post";
import { useSelector } from "react-redux";

const Reposts = () => {
  const _700 = useMediaQuery("(min-width:700px)");
  const { user } = useSelector((state) => state.service);
  return (
    <>
      {user ? (
        user.user ? (
          user.user.reposts.length > 0 ? (
            <Stack
              flexDirection={"column"}
              gap={2}
              mb={10}
              mx={"auto"}
              width={_700 ? "800px" : "90%"}
            >
              {user.user.reposts.map((e) => (
                <Post key={e._id} item={e} />
              ))}
            </Stack>
          ) : (
            <Typography textAlign={"center"} variant="h6">
              No Reposts yet!
            </Typography>
          )
        ) : (
          <Typography textAlign={"center"} variant="h6">
            No Reposts yet!
          </Typography>
        )
      ) : (
        <Typography textAlign={"center"} variant="h6">
          No Reposts yet!
        </Typography>
      )}
    </>
  );
};

export default Reposts;
