import bcrypt from 'bcrypt';
import passwordValidator from 'password-validator';

//Hash the password
async function hashPassword(plaintextPassword) {
    const hash = await bcrypt.hash(plaintextPassword, 10);// password and salt rounds 
    console.log(hash);
    return hash;
}

//Validate the password
   
async function comparePassword(plaintextPassword, hash) {
    return await bcrypt.compare(plaintextPassword, hash);
}

var schema = new passwordValidator()

schema
.is().min(8)                                    // Minimum length 8
.has().digits(1)                                // Must have at least 1 digits
.has().lowercase()                              // Must have lowercase letters
.has().uppercase()                              // Must have uppercase letters

export { hashPassword, comparePassword, schema }