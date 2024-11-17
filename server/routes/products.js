import express from 'express';
import multer from 'multer';
import fs from 'fs';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const imagesFldrPath = "public/images/"; 
const prisma = new PrismaClient();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, imagesFldrPath); // save uploaded files in `public/images` folder
    },
  
    filename: function (req, file, cb) {
      const ext = file.originalname.split('.').pop(); // get file extension
      const uniqueFilename = Date.now() + '-' + Math.round(Math.random() * 1000) + '.' + ext; // generate unique filename - current timestamp + random number between 0 and 1000.
      cb(null, uniqueFilename);
}});

const upload = multer({ storage: storage });

router.get('/all', async (req,res) => {
   //Get all products from the database
   res.send( await prisma.product.findMany());
});

router.get('/:id', async (req,res) => {
   const id = req.params.id;

  // Validate id is a number
  if(isNaN(id)){ //if Not a Number
    return res.status(400).json({ message: 'Invalid product ID.'});    
  }

  // By ID
  const product = await prisma.product.findUnique({
    where: {
      product_id: parseInt(id),
    },
  });

  if(!product) //if product esists send if not send error
    return  res.status(404).json({ message: 'Product not found.'});
  
  return res.json(product);//Get product from the database
});

router.post('/add', upload.single('image'), async (req,res) => {
const fileName = req.file ? req.file.filename : null; // gets unique filename from our middleware multer
  const { name, description, cost} = req.body; //

  if (!name || !description || !cost || !fileName || isNaN(parseFloat(cost))){//checks if the non-nullable values are populated
    if(fileName){ // only attempts to delete file if a file was provided
      fs.rm(imagesFldrPath + fileName, (err) => { //deletes file if missing fields as to not add unecesary files
        if(err){
          console.log(err);
        }
      });
    }
    return res.status(400).json({ message : 'Required fields must have a value.'});
  }
  //creates data in the excpected format of prisma
  const product = await prisma.product.create({
    data: {
      name: name,
      description: description,
      cost: parseFloat(cost),
      image_filename: fileName
    },
  });

  res.json(product);
});

/*router.post('/purchase/:id', async (req,res) =>{

});*/

export default router