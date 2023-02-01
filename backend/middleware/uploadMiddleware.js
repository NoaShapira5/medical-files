const {Storage} = require('@google-cloud/storage');
const Multer = require('multer');
const asyncHandler = require('express-async-handler')


// Instantiate a storage client
const storage = new Storage({ projectId: process.env.GOOGLE_PROJECTID,
  credentials: { client_email: process.env.GOOGLE_CLIENT_EMAIL,
                  private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
                } 
});

// Multer is required to process file uploads and make them available via
// req.files.
const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
    },
  });


// A bucket is a container for objects (files).
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);

const getPublicUrl = (filename) => {
    return `https://storage.googleapis.com/${bucket.name}/${filename}`
}

const sendUploadToGCS = (req, res, next) => {

    if (!req.files) {
      return next()
    }
  
    let promises = [];
    req.files.forEach((image, index) => {
      const blob = bucket.file(image.originalname)
  
      const promise = new Promise((resolve, reject) => {
        const blobStream = blob.createWriteStream({
            metadata: {
                contentType: image.mimetype
              }
        });
  
        blobStream.on('finish', async () => {
          try {
            req.files[index].cloudStorageObject = image.originalname
            await blob.makePublic()
            req.files[index].cloudStoragePublicUrl = getPublicUrl(image.originalname)
            resolve();
          } catch (error) {
            reject(error)
          }
        });
  
        blobStream.on('error', (err) => {
          req.files[index].cloudStorageError = err
          reject(err)
        });
  
        blobStream.end(image.buffer);
      })
  
      promises.push(promise)
    });
  
    Promise.all(promises)
      .then(_ => {
        promises = [];
        next();
      })
      .catch(next);
}


const deleteFile = asyncHandler(async(req, res)  => {
  await storage.bucket(process.env.GCLOUD_STORAGE_BUCKET).file(req.body.image).delete();
  res.status(200).json(req.body.image)
})



module.exports = {
    multer,
    sendUploadToGCS,
    deleteFile
}