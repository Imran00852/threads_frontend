import { Stack, TextField } from "@mui/material";
import Post from "../../components/home/Post";
import Comments from "../../components/home/post/Comments";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAddCommentMutation, useSinglePostQuery } from "../../redux/service";
import { toast, Bounce } from "react-toastify";
const SinglePost = () => {
  const [comment, setComment] = useState("");
  const params = useParams();
  const { data, refetch } = useSinglePostQuery(params?.id);
  const [addComment, addCommentData] = useAddCommentMutation();

  const handleAddComment = async (e) => {
    if (data && e.key === "Enter") {
      const info = {
        id: data.post._id,
        text: comment,
      };
      await addComment(info);
    }
  };

  useEffect(() => {
    if (addCommentData.isSuccess) {
      setComment("");
      refetch();
      toast.success(addCommentData.data.msg, {
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
    if (addCommentData.isError) {
      toast.error(addCommentData.error.data.msg, {
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
  }, [addCommentData.isSuccess, addCommentData.isError]);

  return (
    <>
      <Stack flexDirection={"column"} my={5} gap={2}>
        <Post item={data?.post} />
        <Stack flexDirection={"column"} gap={2} width={"80%"} mx={"auto"}>
          {data
            ? data.post.comments.length > 0
              ? data.post.comments.map((e) => (
                  <Comments key={e._id} e={e} postId={data?.post._id} />
                ))
              : null
            : null}
        </Stack>
        <TextField
          variant="outlined"
          autoFocus
          placeholder="comment here..."
          id="comment"
          sx={{
            width: "50%",
            mx: "auto",
            my: 5,
            p: 1,
          }}
          value={comment ? comment : ""}
          onChange={(e) => setComment(e.target.value)}
          onKeyUp={handleAddComment}
        />
      </Stack>
    </>
  );
};

export default SinglePost;
