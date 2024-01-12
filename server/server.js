const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const { buffer } = req.file;
    const resizedImageBuffer = await sharp(buffer)
      .resize({ width: 300, height: 300 })
      .toBuffer();

    // ส่งไฟล์รูปที่ถูกย่อขนาดกลับไปให้ผู้ใช้
    res.set('Content-Type', 'image/png');
    res.send(resizedImageBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});