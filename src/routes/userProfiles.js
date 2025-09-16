import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import { create } from "../controllers/userProfileController.js";
import { validate } from "../middlewares/validate.js";
import { createProfileSchema } from "../validators/userProfileValidator.js";

const router = express.Router();

router.post("/", validate(createProfileSchema), asyncHandler(create));

export default router;
