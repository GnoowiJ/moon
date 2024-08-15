import multer from 'multer';


//multer 라이브러리를 이용한 파일업로드
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '_' + file.originalname)
  }
})

//multer 라이브러리를 이용한 popupImg파일업로드
const storage1 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/popupImg/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '_' + file.originalname)
  }
})


const fupload = multer({ storage: storage }).single('file');
const fupload1 = multer({ storage: storage1 }).single('file');


export function popupload(req, res) {
  fupload1(req, res, err => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'File upload failed.' });
    }

    if (!res.req.file) {
      console.log('No file uploaded.');
      return res.status(400).json({ error: 'No file uploaded.' });
    }


    res.json({
      uploadImage: res.req.file.path,
      orgImage: res.req.file.originalname
    });
  });
}


export function upload(req, res) {
  fupload(req, res, err => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'File upload failed.' });
    }

    if (!res.req.file) {
      console.log('No file uploaded.');
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    console.log(`File uploaded: ${JSON.stringify(res.req.file)}`);
    res.json({
      uploadImage: res.req.file.path,
      orgImage: res.req.file.originalname
    });
  });
}


