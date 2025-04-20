import Profile from "../models/Profile.js";

const AVATARS = Object.freeze([
  "angryman.png",
  "blue.png",
  "chicken.png",
  "dark blue.png",
  "fluffyblue.png",
  "fluffygrey.png",
  "fluffyyellow.png",
  "green.png",
  "kids.png",
  "panda.png",
  "pink.png",
  "purple.png",
  "red.png",
  "yellow.png",
  "zombi.png",
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