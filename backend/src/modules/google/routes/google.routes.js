import router from "express";
const googleRouter = router.Router();
import { googleLogin } from "../controller/googleLogin.js";
googleRouter.post("/google-login", googleLogin);
export default googleRouter;
