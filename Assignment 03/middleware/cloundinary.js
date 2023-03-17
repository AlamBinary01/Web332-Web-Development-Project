const multer= require("multer");
const cloudinary= require("cloudinary").v2;
const streamifier= require("streamifier");
cloudinary.config({
    cloud_name: "duifda8uv",
    api_key: "185635439394742",
    api_secret: "BdOsU10Q2eLRwu2uMLHUCSS43DI"
  });
  const hh = cloudinary.uploader.upload('https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2017/11/autumn_fireball/17255671-1-eng-GB/Autumn_fireball.jpg', {public_id: "Giraf"})

  hh.then((data) => {
    console.log(data);
    console.log(data.secure_url);
  }).catch((err) => {
    console.log(err);
  });
  
  
  // Generate 
  const url = cloudinary.url("Giraf", {
    width: 100,
    height: 150,
    Crop: 'fill'
  });
  // The output url
  console.log(url);  


  module.exports={
    cloudinary
  }