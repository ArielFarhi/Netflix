import * as React from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MaximizeIcon from "@mui/icons-material/OpenInFull";
import MinimizeIcon from "@mui/icons-material/CloseFullscreen";
import { useProgramDetail } from "../api/programData";
import LoadingScreen from "../components/ui/LoadingScreen";
import { useUserAuth } from "../context/Authentication.jsx";
import { useAddMovieList } from "../api/movieList";
import { useNavigate } from "react-router";

export function MoviePage({ movie: id, isOpen, onClose }) {
    const navigate = useNavigate();
    const { user } = useUserAuth();
    const [open, setOpen] = React.useState(isOpen);
    const [isFullScreen, setIsFullScreen] = React.useState(false);
    const { data, isLoading } = useProgramDetail(id);
    const { mutate: addToList, isLoading: isAdding } = useAddMovieList();

    const handleClose = () => {
        onClose();
        setOpen(false);
        setIsFullScreen(false);
    };

    const toggleFullScreen = () => {
        setIsFullScreen((prev) => !prev);
    };

    const handleAddToList = () => {
        if (!data?.id || !user?._id || !data.title) {
            console.error("❌ Missing required fields:", { data, user });
            return;
        }

        const payload = {
            movieId: data.id,
            userId: user._id,
            title: data.title,
            posterPath: data.poster_path ?? "",
        };

        console.log("📤 Sending payload:", payload);
        addToList(payload);
    };

    if (isLoading) return <LoadingScreen />;

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
                    backgroundImage: `url(${data?.backdrop_path
                        ? 'https://image.tmdb.org/t/p/w500' + data.backdrop_path
                        : '/Hero.png'})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    zIndex: 0,
                }}
            />
            <div
                style={{
                    position: "relative",
                    zIndex: 1,
                    height: "120%",
                    background:
                        "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.8) 100%)",
                }}
            >
                <DialogTitle sx={{ m: 0, p: 0 }}>
                    <Box sx={{ position: "absolute", right: 8, top: 8 }}>
                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={toggleFullScreen}
                            aria-label={isFullScreen ? "minimize" : "maximize"}
                            sx={{ mr: 1 }}
                        >
                            {isFullScreen ? <MinimizeIcon /> : <MaximizeIcon />}
                        </IconButton>
                        <IconButton edge="end" color="inherit" onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>

                <DialogContent
                    dividers
                    sx={{
                        overflowX: "hidden",
                        overflowY: "auto",
                        height: "auto",
                        color: "white",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "transparent",
                    }}
                >
                    <Box
                        sx={{
                            width: "100%",
                            minHeight: "200px",
                            display: "flex",
                            flexDirection: "column",
                            textAlign: "center",
                        }}
                    >
                        <div className="flex gap-1 items-center mt-64 relative z-10">
                            <img src="./NetflixLogoLetter.png" alt="Movie" className="w-3 h-6" />
                            <span className="font-light text-gray-300">
                                {data.genres?.map((genre) => genre.name).join(", ") || "N/A"}
                            </span>
                        </div>

                        <h1 className="font-extrabold text-3xl uppercase flex justify-start">
                            {data.original_title}
                        </h1>

                        <div className="flex gap-2 items-center">
                            <button
                                className="mt-5 w-24 h-8 bg-white rounded-sm text-black flex items-center justify-center gap-3"
                                onClick={() =>
                                    navigate(`review/${id}?posterPath=${data?.poster_path}&title=${data?.original_title}`)
                                }
                            >
                                <i className="fa-solid fa-play"></i> Review
                            </button>
                            <button
                                className="w-8 mt-5 h-8 rounded-full bg-transparent border border-gray-400 flex items-center justify-center"
                                onClick={handleAddToList}
                                disabled={isAdding}
                            >
                                <i className="fa-solid fa-plus"></i>
                            </button>
                        </div>

                        <div className="flex flex-wrap md:flex-nowrap items-center w-full justify-between px-3 mt-14">
                            <div className="flex justify-center flex-col text-left">
                                <div className="flex items-center gap-1 md:gap-2 text-xs md:text-sm text-gray-300">
                                    <span className="text-[#46D369]">New</span> {data.genres?.length || 0} Seasons
                                    <img src="./HD.png" alt="HD" className="w-7 h-4 md:w-5 md:h-3" />
                                </div>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="border border-gray-500 w-14 md:w-20 h-5 text-xs md:text-sm flex items-center justify-center">
                                        {data.original_language?.toUpperCase() || "N/A"}
                                    </span>
                                    <span className="text-xs md:text-sm">
                                        {Array.isArray(data.origin_country) ? data.origin_country.join(", ") : "Unknown"}
                                    </span>
                                </div>
                                <div className="flex items-center mt-4 gap-2">
                                    <img src="./Label.png" alt="" className="w-4 h-4 md:w-6 md:h-6" />
                                    <span className="font-bold text-sm md:text-xl">
                                        #2 in TV Shows Today
                                    </span>
                                </div>
                                <div className="w-full md:w-1/2 mt-4 text-sm text-gray-100">
                                    <p className="leading-tight md:leading-relaxed">{data.overview}</p>
                                </div>
                            </div>

                            <div className="mt-5 md:mt-12 flex flex-col text-left">
                                <p className="text-white text-xs font-thin md:text-sm">
                                    <span className="text-gray-400">Cast: </span>
                                    {data.production_companies?.map((c) => c.name).join(", ") || "N/A"}
                                </p>
                                <p className="text-white text-xs font-thin md:text-sm">
                                    <span className="text-gray-400">Genres: </span>
                                    {data.genres?.map((g) => g.name).join(", ") || "N/A"}
                                </p>
                                <p className="text-white text-xs font-thin md:text-sm">
                                    <span className="text-gray-400">This show is: </span>
                                    {data.belongs_to_collection?.name || "Unknown"}
                                </p>
                            </div>
                        </div>
                    </Box>
                </DialogContent>
            </div>
        </Dialog>
    );
}