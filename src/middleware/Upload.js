import multer from 'multer';

const storage = multer.memoryStorage()

const upload = multer({ storage }).single('image')

const imageUploadController = {
  uploadImage: (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        return res.status(500).json({ success: false, error: 'Error uploading image', err });
      }
      res.json({ success: true, message: 'Image uploaded successfully' });
    });
  },
};

export default imageUploadController;
