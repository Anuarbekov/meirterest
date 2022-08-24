import axios from "axios";
import { useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Head from "next/head";
import Avatar from "@mui/material/Avatar";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
export default function Home() {
  const [images, setImages] = useState([]);
  const [queryString, setQueryString] = useState("");
  const [page, setPage] = useState(1);
  const [allPages, setAllPages] = useState([]);
  const [allRequestedStrings, setAllRequestedStrings] = useState([]);
  const getImages = async (e, page) => {
    e.preventDefault();
    if (queryString != "") {
      const user_key = "40kJkObwZKgcDycHW6Z0UDzoRJF8JIAIiW_CjkbjZEY";
      const result = await axios.get(
        `https://api.unsplash.com/search/photos?query=${queryString}&page=${page}&per_page=10&client_id=${user_key}`
      );
      console.log(result.data);
      if (result.data.total >= 100) {
        if (!allRequestedStrings.includes(queryString)) {
          setPage(1);
          setAllPages([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
          setImages(result.data.results);
          setAllRequestedStrings((prevStrings) => [
            ...prevStrings,
            queryString,
          ]);
        } else {
          setAllPages([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
          setImages(result.data.results);
          setAllRequestedStrings((prevStrings) => [
            ...prevStrings,
            queryString,
          ]);
        }
      } else {
        function range(start, end) {
          /* generate a range : [start, start+1, ..., end-1, end] */
          var len = end - start + 1;
          var a = new Array(len);
          for (let i = 0; i < len; i++) a[i] = start + i;
          return a;
        }
        const pageCount = Math.ceil(result.data.total / 10);
        console.log(pageCount);
        //setAllPages([...Array(pageCount).keys()].map((x) => x++));
        setAllPages([...range(1, pageCount)]);
        setImages(result.data.results);
        setAllRequestedStrings((prevStrings) => [...prevStrings, queryString]);
      }
    } else if (queryString == "") {
      setAllPages([]);
      setImages([]);
      setAllPages([]);
    }
  };
  return (
    <div>
      <Head>
        <title>Meirterest</title>
      </Head>
      <header className="header">
        <div className="logo">
          <Avatar
            sx={{
              bgcolor: "rgb(230 0 35)",
              height: "5vh",
              width: "5vh",
              marginLeft: "0.4em",
              cursor: "pointer",
            }}
            src="/broken-image.jpg"
            onClick={() => window.open("/", "_self")}
          >
            M
          </Avatar>
        </div>

        <form
          id="searchthis"
          style={{ display: "inline" }}
          onSubmit={getImages}
        >
          <input
            id="search-box"
            type="text"
            placeholder=" Search..."
            onChange={(e) => setQueryString(e.target.value)}
          />
          <input id="search-btn" value="Search" type="submit" />
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
                  <h5 className="image-description">{image.likes}</h5>

                  <ThumbUpRoundedIcon
                    sx={{
                      marginLeft: "0.1vw",
                    }}
                  ></ThumbUpRoundedIcon>
                </div>
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
      <div className="footer">
        {allPages?.map((number) => (
          <h3
            key={number}
            onClick={(e) => {
              setPage(number);
              getImages(e, number);
            }}
            className={`page-number ${number === page ? "current" : ""}`}
          >
            {number}
          </h3>
        ))}
      </div>
    </div>
  );
}
