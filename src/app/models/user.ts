import * as mongoose from "mongoose"
import * as bcrypt from "bcrypt-nodejs"
import * as crypto from "crypto"

// export type UserModel = mongoose.Document & {
//   name: string,
//   email: string,
//   password: string,
//   // passwordResetToken: string,
//   // passwordResetExpires: Date,

//   // profile: {
//   //   name: string,
//   //   gender: string,
//   //   location: string,
//   //   website: string,
//   //   picture: string
//   // },
//   // comparePassword: (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void,
// }

// export type AuthToken = {
//   accessToken: string,
//   kind: string
// }

const schema = new mongoose.Schema({

  name: {
    type: String,
  },

  email: {
    type: String,
    unique: true
  },

  password: String,
  passwordResetToken: String,

}, {
  timestamps: true
})

schema.pre("save", function save(next) {
  const user = this

  if (!user.isModified("password")) {
    return next()
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, undefined, (err: mongoose.Error, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next()
    })
  })
})

schema.methods.comparePassword = function (candidatePassword: string, cb: (err: any, isMatch: any) => {}) {
  bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
    cb(err, isMatch)
  })
}

export default mongoose.model("User", schema)
