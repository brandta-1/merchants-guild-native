const { AuthenticationError } = require('apollo-server-express');
const { User, Listing, Item } = require('../models');
const { signToken } = require('../utils/auth');
const util = require('util');
const mongoose = require('mongoose');

const testingID = new mongoose.mongo.ObjectId('65998cab71449c7669565937');

const resolvers = {

    Query: {

        me: async (parent, args, context) => {
            return await User.findOne({ _id: context.user._id });
        },

        getListing: async (parent, args, context) => {
            console.log("hit here")
            const contextID = context.user ? context.user._id : testingID;

            //if there are no args, then just get the logged in user's listings:
            if (!args) {
                const listings = await Listing.aggregate([
                    {
                        $addFields:
                        {
                            ownership: true
                        }
                    },
                    {
                        $match: { user: new mongoose.Types.ObjectId(contextID) }
                    }
                ]);

                await Item.populate(listings, { path: "have want" });

                return listings;
            }

            const { have, want } = args;

            console.log(util.inspect(args, { depth: null }));

            let haveWant = [];
            for (const list of [have, want]) {
                const items = await Promise.all(list.map(async (i) => {
                    const agg = [
                        { $match: { name: i.name } }
                    ]
                    return await Item.aggregate(agg);
                }));
                haveWant.push(items);
            }

            console.log("this is haveWant :", util.inspect(haveWant, { depth: null }));

            console.log("haveWant[0] :", haveWant[1])

            const listings = await Listing.aggregate([
                {
                    //the listing must have atleast one item in common with the search
                    $match: {
                        $or: [
                            { have: { $in: haveWant[0][0].map(i => i._id) } },
                            { want: { $in: haveWant[0][1].map(i => i._id) } }
                        ]
                    }
                },
                {
                    //check if the logged in user owns any of the matched listings
                    $addFields: {
                        ownership: { $in: ["$user", [new mongoose.Types.ObjectId(contextID)]] }
                    }
                },
                //populate the items subdocuments
                {
                    $lookup: {
                        from: "items",
                        localField: "have",
                        foreignField: "_id",
                        as: "have"
                    }
                },
                {
                    $lookup: {
                        from: "items",
                        localField: "want",
                        foreignField: "_id",
                        as: "want"
                    }
                },
                { $project: {  __v: 0 } }
            ]);

            console.log("listings before return: ", util.inspect(listings, { depth: null }))
            return listings;
        }
    },

    Mutation: {

        setUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user)
            return { token, user }
        },

        login: async (parent, { username, password }) => {
            const user = await User.findOne({ username });

            if (!user) {
                throw new AuthenticationError('username not found')
            }

            const pass = await user.isCorrectPassword(password);

            if (!pass) {
                throw new AuthenticationError('invalid credentials')
            }

            const token = signToken(user);
            return { token, user };
        },

        setListing: async (parent, args, context) => {

            const contextID = context.user ? context.user._id : testingID;

            const { have, want, owner, description } = args;

            let haveWant = [];

            for (const items of [have, want]) {

                const itemIDs = await Promise.all(items.map(async (i) => {

                    console.log("THIS IS I: ", i);

                    //check the DB for the item, and add it if it doesnt exist
                    if (!i.enchantments.length) {
                        const item = await Item.findOneAndUpdate(
                            {
                                name: i.name,
                                rarity: i.rarity,
                                enchantments: []
                            },

                            {
                                $setOnInsert: i
                            },
                            {
                                new: true,
                                upsert: true
                            }
                        );

                        return item._id.toHexString();
                    }

                    const findEnchantments = i.enchantments.map((j) => {
                        return { $elemMatch: { property: j.property, value: j.value } }
                    });

                    const item = await Item.findOneAndUpdate(

                        {
                            name: i.name,
                            rarity: i.rarity,
                            enchantments: { $all: findEnchantments }
                        },

                        {
                            $setOnInsert: i
                        },
                        {
                            new: true,
                            upsert: true
                        });

                    return item._id.toHexString();
                }));

                haveWant.push(itemIDs);
            }

            const listing = await Listing.create({
                // user: context.user._id,
                user: contextID,
                owner: owner,
                have: haveWant[0],
                want: haveWant[1],
                description: description
            });
            console.log("made it here?")
            await listing.populate('have want');
            console.log("this is listing :", util.inspect(listing, { depth: null }));
            return listing;
        },

        deleteListing: async (parent, args, context) => {

            const contextID = context.user ? context.user._id : testingID;
            const listing = await Listing.findOneAndDelete({_id: args._id, user: contextID});
            return listing;
        }

    }
}

module.exports = resolvers;