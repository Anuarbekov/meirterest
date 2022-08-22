import axios from "axios";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Head from "next/head";
import Avatar from "@mui/material/Avatar";
export default function Home() {
  const [images, setImages] = useState([]);
  const [queryString, setQueryString] = useState("");
  const [page, setPage] = useState(1);
  const [allPages, setAllPages] = useState([]);
  const getImages = async (e) => {
    e.preventDefault();
    const user_key = "40kJkObwZKgcDycHW6Z0UDzoRJF8JIAIiW_CjkbjZEY";
    const result = await axios.get(
      `https://api.unsplash.com/search/photos?query=${queryString}&page=${page}&per_page=20&client_id=${user_key}`
    );
    const pages = result.data.total_pages;
    setAllPages([...Array(10).keys()].map((i) => i + 1));
    setImages(result.data.results);
  };
  return (
    <div>
      <Head>
        <title>Meirterest</title>
      </Head>
      <header className="header">
        <Avatar
          sx={{
            bgcolor: "rgb(230 0 35)",
            height: "5vh",
            width: "5vh",
            marginLeft: "0.4em",
          }}
          src="/broken-image.jpg"
        >
          M
        </Avatar>
        <div className="input">
          <TextField
            id="outlined-search"
            label="Search..."
            type="search"
            onChange={(e) => setQueryString(e.target.value)}
          />
          <button onClick={ getImages}>Search</button>
        </div>
      </header>
      <form
        id="searchthis"
        style={{ display: "inline" }}
        onSubmit={getImages}
      >
        <input
          id="namanyay-search-box"
          name="q"
          size="40"
          type="text"
          placeholder="  Type! :D "
          onChange={(e) => setQueryString(e.target.value)}
        />
        <input id="namanyay-search-btn" value="Search" type="submit" />
      </form>
      <div className="images">
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 750: 2, 900: 3, 1250: 4 }}
        >
          <Masonry gutter="1vw">
            {images.map((image) => (
              <div key={image.id}>
                <img
                  key={image.id}
                  src={image.urls.full}
                  style={{
                    width: "100%",
                    display: "block",
                    borderRadius: 10,
                  }}
                />
                <div className="author-description">
                  {image.user.profile_image ? (
                    <Avatar
                      sx={{ height: "5vh", width: "5vh" }}
                      src={image.user.profile_image.large}
                    />
                  ) : (
                    <Avatar src="/broken-image.jpg" />
                  )}
                  {image.user.username ? (
                    <h5 className="image-description">{image.user.username}</h5>
                  ) : (
                    <h5 className="image-description">Anonymous</h5>
                  )}
                </div>
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
      <div className="pagination">
        {allPages && allPages.map((page) => <h3 key={page}>{page}</h3>)}
      </div>
    </div>
  );
}
