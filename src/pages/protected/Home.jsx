import Input from "../../components/home/Input";
import { Button, Stack, Typography } from "@mui/material";
import Post from "../../components/home/Post";
import { useAllPostsQuery } from "../../redux/service";
import { useSelector } from "react-redux";
import Loader from "../../components/common/Loader";
import { useEffect, useState } from "react";

const Home = () => {
  const [page, setPage] = useState(1);
  const [showMore, setShowMore] = useState(true);
  const { data, isLoading } = useAllPostsQuery(page);
  const { allPosts } = useSelector((state) => state.service);

  console.log(data);

  const handleClick = () => {
    setPage((pre) => pre + 1);
  };

  useEffect(() => {
    if (data) {
      if (data?.posts?.length < 3) {
        setShowMore(false);
      }
    }
  }, [data]);
  return (
    <>
      <Input />
      <Stack flexDirection={"column"} gap={2} mb={10}>
        {allPosts ? (
          allPosts.length > 0 ? (
            allPosts.map((item) => <Post key={item._id} item={item} />)
          ) : (
            <Typography variant="caption" textAlign={"center"}>
              No Posts Yet!
            </Typography>
          )
        ) : isLoading ? (
          <Loader />
        ) : null}
      </Stack>
      {showMore ? (
        <Button
          size="large"
          sx={{
            my: 5,
            p: 3,
            textDecoration: "underline",
          }}
          onClick={handleClick}
        >
          Load More
        </Button>
      ) : (
        allPosts?.length > 0 && (
          <Typography variant="h6" textAlign={"center"} mb={6}>
            You've reached the end!
          </Typography>
        )
      )}
    </>
  );
};

export default Home;
