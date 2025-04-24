import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Dialog, DialogContent, DialogTrigger } from "../components/ui/Dialog";
import { TextField } from "../components/ui/TextField";
import AddIcon from '@mui/icons-material/Add';
import { useProfiles, useAddProfile } from "../api/profile";

const avatarOptions = Array.from({ length: 10 }, (_, i) => `avatar${i + 1}.png`);

const LoadingBlock = ({ className, ...props }) => (
  <div className={`animate-pulse rounded-md bg-muted ${className || ""}`} {...props} />
);

const ProfileSelection = () => {
  const [newUsername, setNewUsername] = useState("");
  const { data, isLoading, refetch } = useProfiles();
  console.log("Profiles data:", data);
  const { mutate: createProfile, isPending } = useAddProfile();

  const profiles = data?.data?.profiles || [];

  const handleAddProfile = () => {
    if (!newUsername.trim() || profiles.length >= 5) return;

    const randomAvatar = avatarOptions[Math.floor(Math.random() * avatarOptions.length)];

    createProfile(
      { name: newUsername, avatar: randomAvatar },
      {
        onSuccess: () => {
          setNewUsername("");
          refetch();
        },
      }
    );
  };

  return (
    <div className="flex flex-col justify-center items-center bg-black h-screen text-white">
      <h1 className="text-4xl font-bold mb-10">Who's watching?</h1>
      <div className="flex gap-1 flex-wrap justify-center items-center">
        {isLoading
          ? Array.from({ length: 3 }).map((_, idx) => (
            <Card
              key={idx}
              className="w-48 h-56 flex flex-col items-center justify-center bg-muted/10 gap-3"
            >
              <LoadingBlock className="w-32 h-32 rounded-md" />
              <LoadingBlock className="w-24 h-4 rounded-md" />
            </Card>
          ))
          : profiles.map((profile) => (
            <ProfileCard
              key={profile._id}
              username={profile.name}
              avatar={profile.avatar}
            />
          ))}

        {profiles.length < 5 && (
          <Dialog>
            <DialogTrigger asChild>
              <Card className="w-48 h-56 flex flex-col items-center justify-center cursor-pointer bg-transparent border-0 shadow-none hover:bg-transparent focus:outline-none">
                <div className="w-20 h-20 flex items-center justify-center mt-7 rounded-full bg-gray-500">
                  <AddIcon
                    style={{
                      fontSize: 64,
                      color: 'black',
                      fontWeight: 'bold',
                    }}
                  />
                </div>
                <p className="text-sm text-gray-400 mt-8">Add Profile</p>
              </Card>
            </DialogTrigger>
            <DialogContent>
              <div className="space-y-4">
                <h4 className="text-lg font-semibold">Add Profile</h4>
                <TextField
                  placeholder="Enter username"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                />
                <Button
                  onClick={handleAddProfile}
                  className="w-full"
                  disabled={isPending || !newUsername.trim()}
                >
                  {isPending ? "Creating..." : "Create Profile"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default ProfileSelection;

const ProfileCard = ({ username, avatar }) => {
  const navigate = useNavigate();

  const handleProfileSelect = () => {
    localStorage.removeItem("selectedProfile");
    localStorage.setItem("selectedProfile", JSON.stringify({ username, avatar }));
    navigate("/");
  };

  return (
    <Card
      className="w-48 h-56 flex flex-col items-center justify-center cursor-pointer rounded-md border-0 shadow-none bg-transparent hover:bg-transparent focus:outline-none"
      onClick={handleProfileSelect}
    >
      <CardContent className="flex flex-col items-center justify-center p-4 bg-transparent">
        <img
          src={`https://netflix-szyh.onrender.com/images/${avatar || "avatar1.png"}`}
          alt="Profile"
          className="w-32 h-32 object-cover rounded-md mb-2 border-0 outline-none"
        />
        <h5 className="font-medium text-gray-400">{username}</h5>
      </CardContent>
    </Card>
  );
};