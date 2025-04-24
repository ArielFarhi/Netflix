// import * as React from "react";
// import { useNavigate } from "react-router";
// import {
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   IconButton,
//   Box,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import MaximizeIcon from "@mui/icons-material/OpenInFull";
// import MinimizeIcon from "@mui/icons-material/CloseFullscreen";
// import { useProgramDetail } from "../api/programData";
// import { useAddMovieList } from "../api/movieList";
// import { useUserAuth } from "../context/Authentication.jsx";
// import LoadingScreen from "../components/ui/LoadingScreen";

// const MovieDialog = ({ movie: id, isOpen, onClose }) => {
//   const navigate = useNavigate();
//   const { user } = useUserAuth();

//   const [open, setOpen] = React.useState(isOpen);
//   const [isFullScreen, setIsFullScreen] = React.useState(false);

//   const { data, isLoading } = useProgramDetail(id);
//   console.log("Program Detail Data:", data);

//   const { mutate: addToList, isLoading: isAdding } = useAddMovieList();

//   const handleClose = () => {
//     onClose?.();
//     setOpen(false);
//     setIsFullScreen(false);
//   };

//   const toggleFullScreen = () => setIsFullScreen((prev) => !prev);

//   const handleAddToList = () => {
//     if (!data?.id || !user?._id || !data?.title || !data?.poster_path) {
//       console.warn("Missing required fields for movie");
//       return;
//     }

//     addToList({
//       movieId: data.id,
//       userId: user._id,
//       title: data.title,
//       posterPath: data.poster_path,
//     });
//   };

//   if (isLoading || !data) return <LoadingScreen />;

//   const {
//     backdrop_path = "",
//     genres = [],
//     title = "Untitled",
//     overview = "No description available.",
//     original_language = "N/A",
//     origin_country = [],
//     production_companies = [],
//     belongs_to_collection = null,
//     poster_path = "",
//     country = "Unknown",
//   } = data;

//   const genreList = Array.isArray(genres)
//     ? genres.map((g) => (typeof g === "string" ? g : g.name)).filter(Boolean)
//     : [];

//   const countryList =
//     origin_country.length > 0 ? origin_country.join(", ") : "Unknown";

//   const companyList =
//     production_companies.length > 0
//       ? production_companies.map((c) => (typeof c === "string" ? c : c.name)).join(", ")
//       : "N/A";

//   return (
//     <Dialog
//       fullScreen={isFullScreen}
//       open={open}
//       onClose={handleClose}
//       PaperProps={{
//         style: {
//           width: isFullScreen ? "100vw" : "80vw",
//           height: isFullScreen ? "100vh" : "70vh",
//           maxWidth: "100%",
//           overflowX: "hidden",
//           margin: isFullScreen ? 0 : "auto",
//           color: "white",
//           backgroundColor: "rgba(20, 20, 20, 0.9)",
//           position: "relative",
//         },
//       }}
//     >
//       <div
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           right: 0,
//           height: "120%",
//           backgroundImage: `url('https://image.tmdb.org/t/p/w500${backdrop_path}')`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           zIndex: 0,
//         }}
//       />
//       <div
//         style={{
//           position: "relative",
//           zIndex: 1,
//           height: "120%",
//           background:
//             "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6), rgba(0,0,0,0.8))",
//         }}
//       >
//         <DialogTitle sx={{ m: 0, p: 0 }}>
//           <Box sx={{ position: "absolute", right: 8, top: 8 }}>
//             <IconButton onClick={toggleFullScreen} color="inherit" sx={{ mr: 1 }}>
//               {isFullScreen ? <MinimizeIcon /> : <MaximizeIcon />}
//             </IconButton>
//             <IconButton onClick={handleClose} color="inherit">
//               <CloseIcon />
//             </IconButton>
//           </Box>
//         </DialogTitle>

//         <DialogContent
//           dividers
//           sx={{
//             overflowX: "hidden",
//             overflowY: "auto",
//             color: "white",
//             display: "flex",
//             flexDirection: "row",
//             gap: 24,
//             justifyContent: "center",
//             alignItems: "flex-start",
//             backgroundColor: "transparent",
//             paddingTop: "5rem",
//           }}
//         >
//           {/* תמונת פוסטר קטנה */}
//           <Box sx={{ minWidth: 160 }}>
//             <img
//               src={`https://image.tmdb.org/t/p/w300${poster_path}`}
//               alt={title}
//               className="rounded-lg shadow-md max-w-[160px] object-cover"
//             />
//           </Box>

//           {/* תוכן הסרט */}
//           <Box sx={{ maxWidth: "600px", textAlign: "left" }}>
//             <div className="flex gap-1 items-center justify-start mb-2 relative z-10">
//               <img src="./NetflixLogoLetter.png" alt="Logo" className="w-3 h-6" />
//               <span className="font-light text-gray-300">
//                 {genreList.join(", ") || "No genres available"}
//               </span>
//             </div>

//             <h1 className="font-extrabold text-3xl uppercase mb-4">{title}</h1>

//             <div className="flex gap-2 mb-6">
//               <button
//                 className="w-24 h-8 bg-white rounded-sm text-black flex items-center justify-center gap-2"
//                 onClick={() =>
//                   navigate(`/review/${id}?posterPath=${poster_path}&title=${encodeURIComponent(title)}`)
//                 }
//               >
//                 <i className="fa-solid fa-play"></i> Review
//               </button>
//               <button
//                 className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center"
//                 onClick={handleAddToList}
//                 disabled={isAdding}
//               >
//                 <i className="fa-solid fa-plus"></i>
//               </button>
//             </div>

//             <div className="text-sm text-gray-200 space-y-1">
//               <p><strong className="text-[#46D369]">New</strong> • {genreList.length} Categories</p>
//               <p>Language: {original_language.toUpperCase()}</p>
//               <p>Country: {country}</p>
//               <p>Genres: {genreList.join(", ")}</p>
//               <p>Cast: {companyList}</p>
//               <p>Collection: {belongs_to_collection?.name || "Not part of a collection"}</p>
//             </div>

//             <div className="mt-6">
//               <h3 className="font-medium text-lg mb-1">Overview</h3>
//               <p className="leading-tight text-gray-300">{overview}</p>
//             </div>
//           </Box>
//         </DialogContent>
//       </div>
//     </Dialog>
//   );
// };

// export default MovieDialog;



import * as React from "react";
import { useNavigate } from "react-router";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MaximizeIcon from "@mui/icons-material/OpenInFull";
import MinimizeIcon from "@mui/icons-material/CloseFullscreen";
import { useProgramDetail } from "../api/programData";
import { useAddMovieList } from "../api/movieList";
import { useUserAuth } from "../context/Authentication.jsx";
import LoadingScreen from "../components/ui/LoadingScreen";

const MovieDialog = ({ movie: id, isOpen, onClose }) => {
  const navigate = useNavigate();
  const { user } = useUserAuth();

  const [open, setOpen] = React.useState(isOpen);
  const [isFullScreen, setIsFullScreen] = React.useState(false);

  const { data, isLoading } = useProgramDetail(id);
  console.log("Program Detail Data:", data);

  const { mutate: addToList, isLoading: isAdding } = useAddMovieList();

  const handleClose = () => {
    onClose?.();
    setOpen(false);
    setIsFullScreen(false);
  };

  const toggleFullScreen = () => setIsFullScreen((prev) => !prev);

  const handleAddToList = () => {
    if (!data?.id || !user?._id || !data?.title || !data?.poster_path) {
      console.warn("Missing required fields for movie");
      return;
    }

    addToList({
      movieId: data.id,
      userId: user._id,
      title: data.title,
      posterPath: data.poster_path,
    });
  };

  if (isLoading || !data) return <LoadingScreen />;

  const {
    backdrop_path = "",
    genres = [],
    title = "Untitled",
    overview = "No description available.",
    original_language = "N/A",
    origin_country = [],
    production_companies = [],
    belongs_to_collection = null,
    poster_path = "",
    country = "Unknown",
    cast = [],
    crew = [],
    backdrops = [],
    episodes = [],
  } = data;

  const genreList = Array.isArray(genres)
    ? genres.map((g) => (typeof g === "string" ? g : g.name)).filter(Boolean)
    : [];

  const companyList =
    production_companies.length > 0
      ? production_companies.map((c) => (typeof c === "string" ? c : c.name)).join(", ")
      : "N/A";

  const director = crew.find((p) => p.job === "Director")?.name || "N/A";

  return (
    <Dialog
      fullScreen={isFullScreen}
      open={open}
      onClose={handleClose}
      PaperProps={{
        style: {
          width: isFullScreen ? "100vw" : "80vw",
          height: isFullScreen ? "100vh" : "70vh",
          maxWidth: "100%",
          overflowX: "hidden",
          margin: isFullScreen ? 0 : "auto",
          color: "white",
          backgroundColor: "rgba(20, 20, 20, 0.9)",
          position: "relative",
        },
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "120%",
          backgroundImage: `url('https://image.tmdb.org/t/p/w500${backdrop_path}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          height: "120%",
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6), rgba(0,0,0,0.8))",
        }}
      >
        <DialogTitle sx={{ m: 0, p: 0 }}>
          <Box sx={{ position: "absolute", right: 8, top: 8 }}>
            <IconButton onClick={toggleFullScreen} color="inherit" sx={{ mr: 1 }}>
              {isFullScreen ? <MinimizeIcon /> : <MaximizeIcon />}
            </IconButton>
            <IconButton onClick={handleClose} color="inherit">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent
          dividers
          sx={{
            overflowX: "hidden",
            overflowY: "auto",
            color: "white",
            display: "flex",
            flexDirection: "row",
            gap: 24,
            justifyContent: "center",
            alignItems: "flex-start",
            backgroundColor: "transparent",
            paddingTop: "5rem",
          }}
        >
          <Box sx={{ minWidth: 160 }}>
            <img
              src={`https://image.tmdb.org/t/p/w300${poster_path}`}
              alt={title}
              className="rounded-lg shadow-md max-w-[160px] object-cover"
            />
          </Box>

          <Box sx={{ maxWidth: "600px", textAlign: "left" }}>
            <div className="flex gap-1 items-center justify-start mb-2 relative z-10">
              <img src="./NetflixLogoLetter.png" alt="Logo" className="w-3 h-6" />
              <span className="font-light text-gray-300">
                {genreList.join(", ") || "No genres available"}
              </span>
            </div>

            <h1 className="font-extrabold text-3xl uppercase mb-4">{title}</h1>

            <div className="flex gap-2 mb-6">
              <button
                className="w-24 h-8 bg-white rounded-sm text-black flex items-center justify-center gap-2"
                onClick={() =>
                  navigate(`/review/${id}?posterPath=${poster_path}&title=${encodeURIComponent(title)}`)
                }
              >
                <i className="fa-solid fa-play"></i> Review
              </button>
              <button
                className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center"
                onClick={handleAddToList}
                disabled={isAdding}
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>

            <div className="text-sm text-gray-200 space-y-1">
              <p><strong className="text-[#46D369]">New</strong> • {genreList.length} Categories</p>
              <p>Language: {original_language.toUpperCase()}</p>
              <p>Country: {country}</p>
              <p>Genres: {genreList.join(", ")}</p>
              <p>Cast: {companyList}</p>
              <p>Collection: {belongs_to_collection?.name || "Not part of a collection"}</p>
            </div>

            <div className="mt-6">
              <h3 className="font-medium text-lg mb-1">Overview</h3>
              <p className="leading-tight text-gray-300">{overview}</p>
            </div>

            {episodes?.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Episodes</h3>
                <ul className="space-y-2 text-sm">
                  {episodes.map((ep) => (
                    <li key={ep.id}>
                      <strong>Ep {ep.episode_number}:</strong> {ep.name} – {ep.runtime}m
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {backdrops?.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Trailers & More</h3>
                <div className="flex gap-2">
                  {backdrops.slice(0, 3).map((img, i) => (
                    <img
                      key={i}
                      src={`https://image.tmdb.org/t/p/w300${img.file_path}`}
                      alt={`still-${i}`}
                      className="rounded w-[200px] object-cover"
                    />
                  ))}
                </div>
              </div>
            )}

            {(cast.length > 0 || crew.length > 0) && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">About {title}</h3>
                <p><strong>Director:</strong> {director}</p>
                <p><strong>Cast:</strong> {cast.slice(0, 5).map((c) => c.name).join(", ") || "N/A"}</p>
              </div>
            )}
          </Box>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default MovieDialog;
