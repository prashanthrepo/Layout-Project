import { Router } from "express";
import {
  getSingleSite,
  getSiteLeads,
  updateSite,
  getFlatTransactions,
} from "../controllers/flatController";
import { checkAuth, validateId } from "../middlewares";

export const router = Router();

router.get("/:id", checkAuth, validateId, getSingleSite);
router.patch("/:id", checkAuth, validateId, updateSite);
router.get("/:id/leads", checkAuth, validateId, getSiteLeads);
router.get("/:id/transactions", checkAuth, validateId, getFlatTransactions);
