const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const userScheam = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamp: true,
  }
);

userScheam.pre('save',async function(next) {
    if(!this.isModified('password')){
        return next()
    }
    try{
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(this.password,salt);
        this.password = hashedPassword;
        next()

    }catch(error){
        next(error)
    }
    
});

userScheam.methods.comparePassword = async function (candidatePassword) {
    try{
        isMatch = await bcrypt.compare(candidatePassword,this.password)
        return isMatch;
    }catch(error){
        throw(error)
    }
}



const User = mongoose.model('User',userScheam)
module.exports = User