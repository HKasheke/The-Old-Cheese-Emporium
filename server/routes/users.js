import express from 'express';
import { PrismaClient } from '@prisma/client';
import { hashPassword, comparePassword, schema } from '../lib/utility.js';

const router = express.Router();

const prisma = new PrismaClient();

router.post('/signup', async (req,res) => { 
  // get customer input 
  const { email, password, firstName, lastName } = req.body;
  
  //validate the inputs
  if(!email || !password || !firstName || !lastName) {
    return res.status(400).send('Missing required fields');
  }

  // Password validator checks rules in schema
  if(!schema.validate(password)){
    console.log("Invalid password");
    return res.status(400).send('Invalid password');
  }

  // check if customer alredy exists
  const existingCustomer = await prisma.customer.findUnique({
    where: {
      email: email,
    }
  });

  if (existingCustomer) {
    return res.status(400).send('Customer already exists');
  }

   // hash password
   const hashedPassword = await hashPassword(password);
   // add customer to databse
   const customer = await prisma.customer.create({
    data: {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: hashedPassword
    },
  });

   //send response 
  res.json({'email': email});
});

router.post('/login', async (req,res) => {
  // get customer inputs
  const { email, password } = req.body;

  //validate input
  if(!email || !password) {
    return res.status(400).send('Missing required fields');
  }

  //find customer in database
  const existingCustomer = await prisma.customer.findUnique({
    where: {
      email: email,
    }
  });

  if (!existingCustomer) {
    return res.status(404).send('Customer doesn\'t exists');
  }

  // compare/verify password
  const passwordMatch = await comparePassword(password, existingCustomer.password);
  if (!passwordMatch) {
    return res.status(401).send('Invalid password');
  }
  
  // setup customer session
  console.log()
  req.session.customer = {
    customer_id: existingCustomer.customer_id,
    email: existingCustomer.email,
    first_name: existingCustomer.first_name,
    last_name: existingCustomer.last_name
  };

  // send response
  console.log(req.session.customer)
  res.json({ message: 'Login successful', customer: req.session.customer });
});

router.post('/logout', (req,res) => {
  // Checks if there's an empty object aka customer not logged in
  if(!req.session.customer){
    return res.status(401).send('not logged in');
  }
  req.session.destroy((err) => {
    if(err){
      console.error('Error destroying session', err);
      return res.status(500).send('Could not log out. Try again later.');
    }
    res.clearCookie('connect.sid');
    res.send('Logged out successfully');
  });
  //res.send('Logout route');
});

router.get('/getsession', (req,res) => {
  res.json({'customer' : req.session.customer});
});

/*router.get('/address', async (req,res) => {
  const address = await prisma.address.findUnique({
    where:{
      id: req.session.id,
    }
  });

  res.json(address);
});*/

export default router;