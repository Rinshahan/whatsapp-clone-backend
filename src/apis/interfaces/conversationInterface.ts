import mongoose, { ObjectId } from "mongoose"

interface conversation {
  participants: ObjectId[],
  messages: ObjectId[]
  save()
}

export default conversation