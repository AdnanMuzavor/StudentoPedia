const joi = require("joi");
/*
  //email should be valid
 //password ahs min 3 and max 10 chars

  //confirm pass word refers password for type and value
  //phno has a length of 10
  //name is stgring with min of 2 chars
  //address is object but has only satte of type string
  //date of admisison is date and should be fo stduents admitted after said that
  //if male is true, it;s avlue will be "male" with length 4 otherwise female 
with length 6
//hobbies is an array accepting string, number values
//still stduent is boolean field and expects only true value as valid

*/
const StudentValidation = joi.object({
  email: joi.string().email().required(),

  password: joi.string().min(3).max(10).required(),

  cpassword: joi.ref("password"),

  phno: joi.string().length(10),

  name: joi.string().required().min(2),

  address: {
    state: joi.string(),
  },

  doa: joi.date().greater(new Date("2012-01-01")),

  male: joi.boolean().required(),

  genderstring: joi.string().when("male", {
    is: true,
    then: joi.string().required().length(4),
    otherwise: joi.string().required().length(6),
  }),

  hobbies: joi.array(),

  stillStudent: joi.boolean().valid(true),
});

module.exports = StudentValidation;
