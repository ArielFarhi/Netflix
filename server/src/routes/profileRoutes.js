import { Router } from "express";
import * as profileController from "../controllers/profileController.js";
import authenticate from "../middlewares/authMiddleware.js";

const profileRouter = Router();
profileRouter.use(authenticate);

profileRouter
  .route("/")
  .post(profileController.addProfile)
  .get(profileController.getProfiles);

profileRouter
  .route("/:id")
  .put(profileController.updateProfile)
  .delete(profileController.deleteProfile);

export default profileRouter;