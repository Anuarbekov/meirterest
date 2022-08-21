import axios from "axios";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import CssBaseline from "@mui/material/CssBaseline";
import Masonry from "react-responsive-masonry";
import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  navlinks: {},
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(20),
    cursor: "pointer",
  },
}));
export default function Home() {
  const classes = useStyles();
  const [images, setImages] = useState([]);
  const [queryString, setQueryString] = useState("");
  const [page, setPage] = useState(1);
  const getImages = async (query, page) => {
    const user_key = "40kJkObwZKgcDycHW6Z0UDzoRJF8JIAIiW_CjkbjZEY";
    const result = await axios.get(
      `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=30&client_id=${user_key}`
    );
    setImages(result.data.results);
  };
  return (
    <div>
      <AppBar position="sticky">
        <CssBaseline />
        <Toolbar>
          <Typography variant="h5" className={classes.logo}>
            Navbar
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="input">
        <TextField
          id="outlined-search"
          label="Search..."
          type="search"
          onChange={(e) => setQueryString(e.target.value)}
        />
      </div>
      
      <div className="images">
        <Masonry columnsCount={4} gutter="5px">
          {images.map((image) => (
            <img
              key={image.id}
              src={image.urls.regular}
              style={{ width: "100%", display: "block", borderRadius: 10 }}
            />
          ))}
        </Masonry>
      </div>
    </div>
  );
}
