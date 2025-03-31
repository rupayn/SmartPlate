import express from 'express';
import { multerUpload, singleUpload } from '../middlewares/multer.middilewares';
import { changeImage } from '../controllers/menu.controller';
const menuRouter = express.Router();

menuRouter.post("/changeMenu", singleUpload, changeImage);

export { menuRouter };