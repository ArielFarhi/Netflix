import profileService from "../services/profileService.js";

const addProfile = async (req, res, next) => {
  try {
    const created = await profileService.create(req.body, req.user._id);
    res.status(201).json({
      status: "success",
      data: {
        profile: created,
      },
      message: "New profile successfully created.",
    });
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const updated = await profileService.update(req.params.id, req.body);
    res.status(200).json({
      status: "success",
      data: {
        profile: updated,
      },
      message: "Profile successfully updated.",
    });
  } catch (err) {
    next(err);
  }
};

const deleteProfile = async (req, res, next) => {
  try {
    await profileService.remove(req.params.id);
    res.status(204).json({
      status: "success",
      message: "Profile removed.",
    });
  } catch (err) {
    next(err);
  }
};

const getProfiles = async (req, res, next) => {
  try {
    const profiles = await profileService.findByUser(req.user._id);
    res.status(200).json({
      status: "success",
      total: profiles.length,
      data: {
        profiles,
      },
    });
  } catch (err) {
    next(err);
  }
};

export { addProfile, updateProfile, deleteProfile, getProfiles };