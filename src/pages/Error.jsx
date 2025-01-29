import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  return (
    <>
      <Stack
        width={"100%"}
        height={"100vh"}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{
          background: 'url("/error-bg.png")',
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Stack
          bgcolor={"wheat"}
          p={4}
          borderRadius={"10px"}
          border={"2px solid black"}
          alignItems={"center"}
          gap={2}
          boxShadow={"7px 7px 7px white"}
        >
          <Typography variant="h4">OOP's...</Typography>
          <Typography variant="h6">You entered wrong location</Typography>
          <Button
            size="large"
            sx={{
              bgcolor: "blue",
              color: "white",
              borderRadius: "10px",
              transition: "all 0.6s",
              p: 2,
              ":hover": {
                bgcolor: "green",
              },
            }}
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default Error;
