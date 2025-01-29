import { InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLazySearchUsersQuery } from "../../redux/service";
import { addToSearchedUsers } from "../../redux/slice";

const SearchInput = () => {
  const { darkmode } = useSelector((state) => state.service);
  const [query, setQuery] = useState();
  const [searchUser, searchUserData] = useLazySearchUsersQuery();
  const dispatch = useDispatch();
  const handleSearch = async (e) => {
    if (query && e.key === "Enter") {
      await searchUser(query);
    }
  };

  useEffect(() => {
    if (searchUserData.isSuccess) {
      dispatch(addToSearchedUsers(searchUserData.data.users));
      console.log(searchUserData.data);
    }
    if (searchUserData.isError) {
      console.log(searchUserData.error.data);
    }
  }, [searchUserData.isSuccess, searchUserData.isError]);
  return (
    <>
      <TextField
        sx={{
          width: "90%",
          maxWidth: "750px",
          boxShadow: "5px 5px 5px gray",
          borderRadius: "15px",
          px: 2,
          py: 1,
          mx: "auto",
          my: 5,
          "& .MuiOutlinedInput-root": {
            color: darkmode ? "whitesmoke" : "black",
            "& fieldset": {
              border: "none",
            },
          },
        }}
        placeholder="search user...."
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment
                position="start"
                sx={{ color: darkmode ? "whitesmoke" : "black" }}
              >
                <FaSearch />
              </InputAdornment>
            ),
          },
        }}
        onChange={(e) => setQuery(e.target.value)}
        onKeyUp={handleSearch}
      />
    </>
  );
};

export default SearchInput;
