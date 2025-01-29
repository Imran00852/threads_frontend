import { Stack, Typography, useMediaQuery } from "@mui/material";
import Post from "../../../components/home/Post";
import { useSelector } from "react-redux";

const Threads = () => {
  const _700 = useMediaQuery("(min-width:700px)");
  const { user } = useSelector((state) => state.service);
  return (
    <>
      {user ? (
        user.user ? (
          user.user.threads.length > 0 ? (
            <Stack
              flexDirection={"column"}
              gap={2}
              mb={10}
              mx={"auto"}
              width={_700 ? "800px" : "90%"}
            >
              {user.user.threads.map((e) => (
                <Post key={e._id} item={e} />
              ))}
            </Stack>
          ) : (
            <Typography variant="h6" textAlign={"center"}>
              No Threads yet!
            </Typography>
          )
        ) : (
          <Typography variant="h6" textAlign={"center"}>
            No Threads yet!
          </Typography>
        )
      ) : (
        <Typography variant="h6" textAlign={"center"}>
          No Threads yet!
        </Typography>
      )}
    </>
  );
};

export default Threads;
