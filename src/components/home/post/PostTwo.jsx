import { Stack, Typography, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import { IoMdSend } from "react-icons/io";
import { FaRegComment } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { FaRetweet } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import {
  useLikePostMutation,
  useMyInfoQuery,
  useRepostMutation,
} from "../../../redux/service";
import { useEffect, useState } from "react";
import { toast, Bounce } from "react-toastify";

const PostTwo = ({ item }) => {
  const { darkmode, myInfo } = useSelector((state) => state.service);
  const [likePost] = useLikePostMutation();
  const [repost, repostData] = useRepostMutation();

  const [isLiked, setIsLiked] = useState();

  const _300 = useMediaQuery("(min-width:300px)");
  const _400 = useMediaQuery("(min-width:400px)");
  const _500 = useMediaQuery("(min-width:500px)");
  const _700 = useMediaQuery("(min-width:700px)");

  const handleLike = async () => {
    await likePost(item?._id);
  };
  const checkIsLiked = () => {
    if (item?.likes.length > 0) {
      const variable = item.likes.filter((e) => e._id === myInfo._id);
      if (variable.length > 0) {
        setIsLiked(true);
        return;
      }
    }
    setIsLiked(false);
  };

  const handleRepost = async () => {
    await repost(item?._id);
  };

  useEffect(() => {
    checkIsLiked();
  }, [item]);

  useEffect(() => {
    if (repostData.isSuccess) {
      toast.success(repostData.data.msg, {
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
    if (repostData.isError) {
      toast.error(repostData.error.data.msg, {
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
  }, [repostData.isSuccess, repostData.isError]);
  return (
    <>
      <Stack flexDirection={"column"} justifyContent={"space-between"}>
        <Stack flexDirection={"column"} gap={2}>
          <Stack flexDirection={"column"}>
            <Typography
              variant="h6"
              fontSize={_300 ? "1rem" : "0.8rem"}
              fontWeight={"bold"}
            >
              {item ? item.admin?.username : ""}
            </Typography>
            <Link to={`/post/${item?._id}`} className="link">
              <Typography
                variant="h5"
                fontSize={
                  _700 ? "1.2rem" : _400 ? "1rem" : _300 ? "0.9rem" : "0.8"
                }
                className={darkmode ? "mode" : ""}
              >
                {item ? item.text : ""}
              </Typography>
            </Link>
          </Stack>
          {item ? (
            item.media ? (
              <img
                src={item?.media}
                alt={item?.media}
                loading="lazy"
                width={
                  _700
                    ? "400px"
                    : _500
                    ? "350px"
                    : _400
                    ? "250px"
                    : _300
                    ? "180px"
                    : "150px"
                }
                height={"auto"}
              />
            ) : null
          ) : null}
        </Stack>

        {/* Like,comment,repost icons */}
        <Stack flexDirection={"column"} gap={1}>
          <Stack flexDirection={"row"} gap={2} m={1}>
            {isLiked ? (
              <FaHeart size={_700 ? 32 : _300 ? 28 : 24} onClick={handleLike} />
            ) : (
              <FaRegHeart
                size={_700 ? 32 : _300 ? 28 : 24}
                onClick={handleLike}
              />
            )}
            <Link to={`/post/${item?._id}#comment`} className="link">
              <FaRegComment size={_700 ? 32 : _300 ? 28 : 24} />
            </Link>

            <FaRetweet
              size={_700 ? 32 : _300 ? 28 : 24}
              onClick={handleRepost}
            />
            <IoMdSend size={_700 ? 32 : _300 ? 28 : 24} />
          </Stack>
          <Stack
            flexDirection={"row"}
            position={"relative"}
            top={-3}
            left={4}
            gap={1}
          >
            {item ? (
              item.likes.length > 0 ? (
                <Typography
                  variant="caption"
                  color={darkmode ? "white" : "GrayText"}
                  fontSize={_700 ? "1.1rem" : "1rem"}
                >
                  {item.likes.length} {item.likes.length > 1 ? "likes" : "like"}
                  .
                </Typography>
              ) : (
                ""
              )
            ) : (
              ""
            )}
            {item ? (
              item.comments.length > 0 ? (
                <Typography
                  variant="caption"
                  color={darkmode ? "white" : "GrayText"}
                  fontSize={_700 ? "1.1rem" : "1rem"}
                >
                  {item.comments.length}comment
                </Typography>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default PostTwo;
