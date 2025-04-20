import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/Card";
import { ActionButton } from "../components/ui/Button";
import { Dialog, DialogContent, DialogTrigger } from "../components/ui/Dialog";
import { TextField } from "../components/ui/TextField";
import { PlusCircle } from "lucide-react";
import { useProfiles, useAddProfile } from "../api/profile";
import { useNavigate } from "react-router";

const LoadingBlock = ({ className, ...props }) => {
  return (
    <div
      className={`animate-pulse rounded-md bg-muted ${className || ""}`}
      {...props}
    />
  );
};

const ProfileSelection = () => {
  const [newUsername, setNewUsername] = useState("");
  const { data, isLoading, refetch } = useProfiles();
  const { mutate: createProfile, isPending } = useAddProfile();
  const profiles = data?.data?.profiles || [];
  const handleAddProfile = () => {
    if (!newUsername.trim()) return;
    if (profiles.length >= 5) return;

    createProfile(
      { name: newUsername },
      {
        onSuccess: () => {
          setNewUsername("");
          refetch();
        },
      }
    );
  };

  return (
    <div className="flex gap-4 p-6 bg-black h-screen justify-center items-center flex-wrap">
      {isLoading
        ? Array.from({ length: 3 }).map((_, idx) => (
            <Card
              key={idx}
              className="w-36 h-40 flex flex-col items-center justify-center text-center rounded-xl overflow-hidden bg-muted/10 p-4 gap-3"
            >
              <LoadingBlock className="w-16 h-16 rounded-full" />
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
            <Card className="w-36 h-40 flex items-center justify-center bg-muted/10 cursor-pointer hover:bg-muted transition rounded-xl border-dashed border">
              <PlusCircle className="w-10 h-10 text-muted-foreground" />
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
              <ActionButton
                onClick={handleAddProfile}
                className="w-full"
                disabled={isPending || !newUsername.trim()}
              >
                {isPending ? "Creating..." : "Create Profile"}
              </ActionButton>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ProfileSelection;

const ProfileCard = ({ username, avatar }) => {
  const navigate = useNavigate();
  const handleProfileSelect = () => {
    localStorage.removeItem("selectedProfile");
    localStorage.setItem(
      "selectedProfile",
      JSON.stringify({ username, avatar })
    );
    navigate("/");
  };

  return (
    <Card
      className="w-36 h-40 flex flex-col items-center justify-center text-center rounded-xl overflow-hidden bg-black"
      onClick={handleProfileSelect}
    >
      <CardContent className="flex flex-col items-center justify-center p-4">
        <img
          src={`${process.env.REACT_APP_PUBLIC_URL}profile-avators/${
            avatar || "default.png"
          }`}
          alt="Profile"
          className="rounded-full mb-2 object-cover w-16 h-16"
        />
        <h5 className="font-medium text-white">{username}</h5>
      </CardContent>
    </Card>
  );
};