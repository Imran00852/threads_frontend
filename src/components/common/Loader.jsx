import { Stack, CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <Stack
      direction={"row"}
      minHeight={"50vh"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"100%"}
      width={"100%"}
      my={5}
    >
      <CircularProgress color="success" />
    </Stack>
  );
};

export default Loader;
