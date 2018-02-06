// import settings from 'config/settings'
// import { User } from "config/initialize/mongoose"
// import { verifyJwt } from 'app/services/jwt'

export default async (req: any, res: any, next: any) => {
  // if (!req.header('Authorization') || !req.header('authorization')) {
  //   return next()
  // }

  // const parts = req.header('Authorization').split(' ');
  // const token = parts[1]

  // if (!token) {
  //   res.status(401)
  //   next(new Error("token not found"))
  // }

  // let payload

  // try {
  //   payload = await verifyJwt(token)
  // } catch (err){
  //   res.status(401)
  //   // return next(new Error("token not valid"))
  //   throw new Error("token not valid")
  // }


  //   // console.log(7)
  //   // console.log(1, token)
  //   // console.log(2)
  //   // console.log(999)

  //   // console.log(payload)
  //   // req.payload = payload
  //   // console.log(req.payload)


  //   // const users = await User.find()

  //   // req.payload = {
  //   //   user_id: users[0].id
  //   // }

  // req.user = await User.findById(req.payload.user_id)

  // if (!req.user) {
  //   res.status(401)
  //   throw new Error("user not found")
  // }

  // req.log.info(`login as ${req.payload.user_id}, ${req.payload.email}, role = ${req.payload.role}`)

  return next()

    // return next()
  // } catch (err){
    // console.log("TRY", err)
    // return next()
  // }

}
