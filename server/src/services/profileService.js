import Profile from "../models/Profile.js";

const AVATARS = Object.freeze([
  "avatar1.png",
  "avatar2.png",
  "avatar3.png",
  "avatar4.png",
  "avatar5.png",
  "avatar6.png",
  "avatar7.png",
  "avatar8.png",
  "avatar9.png",
  "avatar10.png",
  "avatar11.png",
  "avatar12.png",
  "avatar13.png",
  "avatar14.png",
  "avatar15.png",
]);

function selectRandomAvatar() {
  return AVATARS[Math.floor(Math.random() * AVATARS.length)];
}

async function create(profileInfo, userId) {
  const existingProfiles = await Profile.countDocuments({ userId });

  if (existingProfiles >= 5) {
    throw new Error("5 profiles already exist for this user");
  }

  const newProfile = {
    ...profileInfo,
    userId,
    avatar: selectRandomAvatar(),
  };

  return Profile.create(newProfile);
}

async function update(id, updates) {
  return Profile.findByIdAndUpdate(id, updates, { new: true });
}

async function remove(id) {
  return Profile.findByIdAndDelete(id);
}

async function findByUser(userId) {
  return Profile.find({ userId });
}

export default {
  create,
  update,
  remove,
  findByUser,
};