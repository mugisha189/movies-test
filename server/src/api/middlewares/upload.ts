import { NextFunction, Request, Response } from "express";
import { storage } from "./storage";
import multer from "multer";

const upload = multer({ storage });

const uploadPosts = (req: Request, res: Response, next: NextFunction) => {
    const formData = req.body;
    const fields = Object.keys(formData).filter(key => key.startsWith('file'));
  
    const multerMiddleware = upload.fields(fields.map(field => ({ name: field })));
  
    multerMiddleware(req, res, err => {
        console.log("uploading")
      if (err) {
        console.log(err)
        return next(err);
      }
      next();
    });
  };
  

export { upload,uploadPosts };
