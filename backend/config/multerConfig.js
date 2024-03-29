import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Handle any errors that might occur
        try {
            cb(null, "backend/public/userProfilePictures");
        } catch (error) {
            cb(error); // Pass the error to the callback
        }
    },
    filename: (req, file, cb) => {
        // Handle any errors that might occur
        try {
            cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
        } catch (error) {
            cb(error); // Pass the error to the callback
        }
    }
});

const fileFilter = (req, file, cb) => {
    // Check if the file is an image
    if (file.mimetype.startsWith("image/")) {
        cb(null, true); // Pass no error and allow the upload
    } else {
        // Pass an error to indicate that only images are allowed
        cb(new Error("Only images are allowed"), false);
    }
};

export const multerUploadUserProfile = multer({
    storage,
    fileFilter
});
