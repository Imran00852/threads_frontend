import { Stack, Typography, useMediaQuery } from "@mui/material";
import Comments from "../../../components/home/post/Comments";
import { useSelector } from "react-redux";

const Replies = () => {
  const _700 = useMediaQuery("(min-width:700px)");
  const { user } = useSelector((state) => state.service);
  return (
    <>
      <Stack
        flexDirection={"column"}
        width={_700 ? "800px" : "90%"}
        mx={"auto"}
        gap={2}
      >
        {user ? (
          user.user ? (
            user.user.replies.length > 0 ? (
              user.user.replies.map((e) => (
                <Comments key={e._id} e={e} postId={e.post} />
              ))
            ) : (
              <Typography textAlign={"center"} variant="h6">
                No replies yet!
              </Typography>
            )
          ) : null
        ) : null}
      </Stack>
    </>
  );
};

export default Replies;
