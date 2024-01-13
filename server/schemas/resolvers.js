const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            }
            throw AuthenticationError;
        },
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!User) {
                throw AuthenticationError;
            }

            const correctPw = await profile.isCorrectPassword(password);
            if (!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, { savedBook }, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: savedBook } },
                    { new: true, runValidators: true }
                );
            }
            throw AuthenticationError;
        },
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: bookId } },
                    { new: true }
                );
            }
            throw AuthenticationError;
        },
    },
};

module.exports = resolvers;