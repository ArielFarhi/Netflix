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

const MovieDialog = ({ movie: id, isOpen, onClose, type = "movie" }) => {
  const navigate = useNavigate();
  const { user } = useUserAuth();
  const [open, setOpen] = React.useState(isOpen);
  const [isFullScreen, setIsFullScreen] = React.useState(false);
  const { data, isLoading } = useProgramDetail(id, type);
  const { mutate: addToList, isLoading: isAdding } = useAddMovieList();
  const handleClose = () => {
    onClose?.();
    setOpen(false);
    setIsFullScreen(false);
  };
  const toggleFullScreen = () => setIsFullScreen((prev) => !prev);
  const handleAddToList = () => {
    if (!data?.id || !user?._id || !data?.title || !data?.poster_path) return;
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
    poster_path = "",
    country = "Unknown",
    episodes = [],
  } = data;
  const genreList = Array.isArray(genres)
    ? genres.map((g) => (typeof g === "string" ? g : g.name)).filter(Boolean)
    : [];
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
        <DialogContent>
          <div
            style={{
              width: "100%",
              height: "60vh",
              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(20,20,20,1)), url(https://image.tmdb.org/t/p/original${poster_path})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderTopLeftRadius: "0.5rem",
              borderTopRightRadius: "0.5rem",
              marginBottom: "2rem",
            }}
          />

          <div className="text-white z-10 max-w-3xl">
            <p className="text-[#e50914] font-bold tracking-widest mb-1">N SERIES</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold uppercase mb-4">{title}</h1>

            <div className="flex gap-4 mb-6">
              <button
                className="bg-white text-black font-medium px-4 py-2 rounded hover:bg-opacity-80"
                onClick={() =>
                  navigate(`/review/${id}?posterPath=${poster_path}&title=${encodeURIComponent(title)}`)
                }
              >
                <i className="fa-solid fa-play mr-2" /> Review
              </button>
              <button
                onClick={handleAddToList}
                disabled={isAdding}
                className="w-10 h-10 border border-white rounded-full flex items-center justify-center hover:bg-white/20"
              >
                <i className="fa-solid fa-plus text-white" />
              </button>
            </div>
          </div>
          {type === "tv" && episodes?.length > 0 && (
            <div style={{ backgroundColor: "#181818", padding: "2rem" }}>
              <h3 className="text-xl font-semibold mb-4 text-white">Episodes</h3>
              <div className="space-y-4">
                {episodes.map((ep) => (
                  <div
                    key={ep.episode_number}
                    className="flex items-start gap-4 bg-[#202020] p-3 rounded"
                  >
                    {ep.still_path && (
                      <img
                        src={`https://image.tmdb.org/t/p/w300${ep.still_path}`}
                        alt={`Episode ${ep.episode_number}`}
                        className="w-[120px] h-[70px] object-cover rounded"
                      />
                    )}
                    <div>
                      <p className="text-white font-semibold">
                        Ep {ep.episode_number}: {ep.name}
                      </p>
                      <p className="text-gray-300 text-sm">
                        {ep.overview?.trim() || "No description available."}
                      </p>
                      <p className="text-gray-400 text-xs mt-1">{ep.runtime}m</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default MovieDialog;