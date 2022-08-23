import axios from "axios";
import { useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Head from "next/head";
import Avatar from "@mui/material/Avatar";
export default function Home() {
  const [images, setImages] = useState([]);
  const [queryString, setQueryString] = useState("");
  const [page, setPage] = useState(1);
  const [allPages, setAllPages] = useState([]);
  const getImages = async (e = null, page = page) => {
    console.log(page);
    e.preventDefault();
    if (queryString != "") {
      const user_key = "40kJkObwZKgcDycHW6Z0UDzoRJF8JIAIiW_CjkbjZEY";
      const result = await axios.get(
        `https://api.unsplash.com/search/photos?query=${queryString}&page=${page}&per_page=20&client_id=${user_key}`
      );
      setAllPages([...Array(10).keys()].map((i) => i + 1));
      setImages(result.data.results);
    }

    if (queryString != "") {
      const user_key = "40kJkObwZKgcDycHW6Z0UDzoRJF8JIAIiW_CjkbjZEY";
      const result = await axios.get(
        `https://api.unsplash.com/search/photos?query=${queryString}&page=${page}&per_page=20&client_id=${user_key}`
      );
      setAllPages([...Array(10).keys()].map((i) => i + 1));
      setImages(result.data.results);
    }
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
      </header>

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
                    cursor: "pointer",
                  }}
                  onClick={() => window.open(image.links.download, "_blank")}
                />
                <div className="author-description">
                  <Avatar
                    sx={{ height: "5vh", width: "5vh", cursor: "pointer" }}
                    src={image.user.profile_image?.large}
                    onClick={() => window.open(image.user.links.html, "_blank")}
                  />
                  {image.user.username ? (
                    <h5
                      className="image-description"
                      onClick={() =>
                        window.open(image.user.links.html, "_blank")
                      }
                    >
                      {image.user.username}
                    </h5>
                  ) : (
                    <h5 className="image-description">Anonymous</h5>
                  )}
                </div>
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
      {/*<div className="footer">
        {allPages.map((number) => (
          <h3
            key={number}
            onClick={(e) => {
              setPage(number);
              getImages(number);
            }}
          >
            {number}
          </h3>
        ))}
          </div>*/}
    </div>
  );
}
