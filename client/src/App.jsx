// ที่ src/App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [resizedImageUrl, setResizedImageUrl] = useState(null);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('image', selectedImage);

      const response = await fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: formData,
      });

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);

      // แสดงรูปที่ถูกย่อขนาดในหน้าเว็บ
      console.log(imageUrl);

      // บันทึก URL ของรูปที่ถูกย่อขนาด
      setResizedImageUrl(imageUrl);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownload = () => {
    if (resizedImageUrl) {
      // สร้าง element สำหรับดาวน์โหลด
      const link = document.createElement('a');
      link.href = resizedImageUrl;
      link.download = 'resized_image.png';
      document.body.appendChild(link);

      // ทำการคลิกที่ element นี้เพื่อเริ่มการดาวน์โหลด
      link.click();

      // ลบ element ที่สร้างขึ้น
      document.body.removeChild(link);
    }
  };

  return (
    <div className="App">
      <h1 className='text-center text-3xl p-5'>Image <span className='text-3xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text'>Resizer</span></h1>
      <div className='flex justify-center'>
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      <div className='flex justify-center p-10'>
        <button onClick={handleImageUpload} className='border border-black px-5 py-1 rounded-xl hover:text-white hover:bg-black transition'>Upload and Resize</button>
      </div>


      {resizedImageUrl && (
        <div className='flex justify-center'>
          <div>
            <h2 className='text-center text-xl p-5'><span className='text-xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text'>Resized</span> Image</h2>
            <img className='rounded-xl' src={resizedImageUrl} alt="Resized" />
            <div className='flex justify-center p-5'>
              <button onClick={handleDownload} className='px-5 py-1 border border-black rounded-xl hover:text-white hover:bg-black transition'>Download</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;