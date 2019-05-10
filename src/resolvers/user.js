import mongoose from 'mongoose'
import { UserInputError } from 'apollo-server-express'
import Joi from 'joi'
import { User } from '../models'
import { SignUp } from '../schemas'

export default {
  Query: {
    users: () => {
      // TODO: auth, projection, pagination, sanitization

      return User.find({})
    },
    user: (root, { id }) => {
      // TODO: auth, projection, sanitization

      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid user ID`)
      }

      return User.findById(id)
    },
  },
  Mutation: {
    signUp: async (root, args) => {
      // TODO: not auth

      // validation
      await Joi.validate(args, SignUp, { abortEarly: false })

      return User.create(args)
    },
  },
}
