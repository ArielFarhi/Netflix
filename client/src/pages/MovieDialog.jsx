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
// import { useAddMovieList } from "../api/movieList"; // ✅ תיקון הייבוא
// import { useUserAuth } from "../context/Authentication.jsx";
// import LoadingScreen from "../components/ui/LoadingScreen";

// const MovieDialog = ({ movie: id, isOpen, onClose }) => {
//   const navigate = useNavigate();
//   const { user } = useUserAuth();

//   const [open, setOpen] = React.useState(isOpen);
//   const [isFullScreen, setIsFullScreen] = React.useState(false);

//   const { data, isLoading } = useProgramDetail(id);
//   const { mutate: addToList, isLoading: isAdding } = useAddMovieList(); // ✅ שימוש נכון

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

//   if (isLoading) return <LoadingScreen />;

//   const {
//     backdrop_path,
//     genres,
//     original_title,
//     overview,
//     original_language,
//     origin_country,
//     production_companies,
//     belongs_to_collection,
//   } = data;

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
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//             backgroundColor: "transparent",
//           }}
//         >
//           <Box sx={{ width: "100%", textAlign: "center", mt: 16 }}>
//             <div className="flex gap-1 items-center justify-center mb-2 relative z-10">
//               <img src="./NetflixLogoLetter.png" alt="Logo" className="w-3 h-6" />
//               <span className="font-light text-gray-300">
//                 {genres.map((g) => g.name).join(", ")}
//               </span>
//             </div>
//             <h1 className="font-extrabold text-3xl uppercase">{original_title}</h1>
//             <div className="flex gap-2 justify-center mt-4">
//               <button
//                 className="w-24 h-8 bg-white rounded-sm text-black flex items-center justify-center gap-2"
//                 onClick={() =>
//                   navigate(`review/${id}?posterPath=${data?.poster_path}`)
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
//             <div className="flex flex-col md:flex-row justify-between px-4 mt-8 text-left text-sm text-gray-200">
//               <div className="flex-1 space-y-2">
//                 <p><strong className="text-[#46D369]">New</strong> • {genres.length} Seasons</p>
//                 <p>Language: {original_language.toUpperCase()}</p>
//                 <p>Country: {origin_country.join(", ")}</p>
//                 <p>Genres: {genres.map((g) => g.name).join(", ")}</p>
//                 <p>Cast: {production_companies.map((c) => c.name).join(", ")}</p>
//                 <p>Collection: {belongs_to_collection?.name || "Not part of a collection"}</p>
//               </div>
//               <div className="flex-1 mt-4 md:mt-0">
//                 <h3 className="font-medium text-lg mb-1">Overview</h3>
//                 <p className="leading-tight">{overview}</p>
//               </div>
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

  // ✅ הגנה מפני חוסר נתונים
  const {
    backdrop_path = "",
    genres = [],
    original_title = "Untitled",
    overview = "No description available.",
    original_language = "N/A",
    origin_country = [],
    production_companies = [],
    belongs_to_collection = null,
  } = data || {};

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
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
          }}
        >
          <Box sx={{ width: "100%", textAlign: "center", mt: 16 }}>
            <div className="flex gap-1 items-center justify-center mb-2 relative z-10">
              <img src="./NetflixLogoLetter.png" alt="Logo" className="w-3 h-6" />
              <span className="font-light text-gray-300">
                {genres.map((g) => g.name).join(", ")}
              </span>
            </div>
            <h1 className="font-extrabold text-3xl uppercase">{original_title}</h1>
            <div className="flex gap-2 justify-center mt-4">
              <button
                className="w-24 h-8 bg-white rounded-sm text-black flex items-center justify-center gap-2"
                onClick={() =>
                  navigate(`/review/${id}?posterPath=${data?.poster_path}`)
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
            <div className="flex flex-col md:flex-row justify-between px-4 mt-8 text-left text-sm text-gray-200">
              <div className="flex-1 space-y-2">
                <p><strong className="text-[#46D369]">New</strong> • {genres.length} Categories</p>
                <p>Language: {original_language.toUpperCase()}</p>
                <p>Country: {origin_country.join(", ") || "Unknown"}</p>
                <p>Genres: {genres.map((g) => g.name).join(", ")}</p>
                <p>Cast: {production_companies.map((c) => c.name).join(", ")}</p>
                <p>Collection: {belongs_to_collection?.name || "Not part of a collection"}</p>
              </div>
              <div className="flex-1 mt-4 md:mt-0">
                <h3 className="font-medium text-lg mb-1">Overview</h3>
                <p className="leading-tight">{overview}</p>
              </div>
            </div>
          </Box>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default MovieDialog;
