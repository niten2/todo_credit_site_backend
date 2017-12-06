import settings from 'config/settings'
import mongoose from 'mongoose'
import GoogleTokenStrategy from 'passport-google-token'

const User = mongoose.model('users')

export const findOrCreateUser = async (accessToken, refreshToken, profile, done) =>  {
  try {
    let user

    user = await User.findOne({ 'google.id': profile.id })

    if (user) {
      return done(null, user)
    }

    const email = profile.emails && profile.emails[0].value

    if (!email) {
      return done(new Error("email not found"), null)
    }

    if (await User.findOne({ 'email': email })) {
      return done(new Error("email already exist"), null)
    }

    user = new User({
      name: profile.displayName,
      email: profile.emails[0].value,
      password: Math.random().toString(36).slice(-8),
      provider: 'google',
      google: profile._json,
    })

    await user.save()

    return done(null, user)
  } catch (err) {
    return done(err, null)
  }
}

export default new GoogleTokenStrategy.Strategy(
  {
    clientID: settings.google.clientID,
    clientSecret: settings.google.clientSecret,
  },
  findOrCreateUser
)
