import multer from "multer"
import cloudinary from "cloudinary"
import dotenv from 'dotenv'
import { NextFunction, Request, Response } from "express"
import { customError } from "../utils/customError"
import fs from "fs"
dotenv.config({ path: './config.env' })

const storage = multer.diskStorage({
  destination: 'src/apis/assets',
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()} ${file.originalname}`)
  }
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }
})


const cloud = cloudinary.v2

cloud.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})


const imageUpload = (req: Request, res: Response, next: NextFunction) => {
  upload.single('image')(req, res, async (err) => {
    if (err) {
      console.log(err)
      next(new customError("File not uploaded", 401))
    }
    try {
      const result = await cloud.uploader.upload(req.file.path, {
        folder: "images"
      })

      req.body.image = result.secure_url
      next()
    } catch (error) {
      console.log(error)
      fs.unlink(req.file.path, (unlinker) => {
        if (unlinker) {
          console.log(`Error, deleting local file`, unlinker)
        }
      })
      next(new customError(`${error}`, 401))
    }
  })
}

export {
  imageUpload
}