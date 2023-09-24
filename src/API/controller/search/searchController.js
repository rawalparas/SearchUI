const message = require("../../../helper/messages.js");
const book = require("../../../model/bookModel.js");
const mongoose = require("mongoose");

module.exports = {
    search: async (req, res) => {
        try {
            const search = req.query.search;
            const isName = req.query.isName;
            const author = req.query.author;
            const isLanguage = req.query.isLanguage;
            const isSubject = req.query.isSubject;
            const pageNumber = req.query.pageNumber;
            const limit = req.query.limit || 5;
            const offset = (pageNumber - 1) * limit;

            let query = {};

            if (author) {
                query = { authorName: { $regex: new RegExp(search, "i") } };
            }
            else if (isName) {
                query = { name: { $regex: new RegExp(search, "i") } };
            }
            else if (isSubject) {
                query = { subject: { $regex: new RegExp(search, "i") } };
            }
            else if (isLanguage) {
                query = { language: { $regex: new RegExp(search, "i") } };
            }
            else if (search) {
                query.$or = [
                    { name: { $regex: new RegExp(search, "i") } },
                    { authorName: { $regex: new RegExp(search, "i") } },
                    { subject: { $regex: new RegExp(search, "i") } },
                    { language: { $regex: new RegExp(search, "i") } },
                ];
            }

            const getBooks = await book.find(query, { _id: 0, __v: 0 }).skip(offset).limit(limit);

            return res.status(200).send(getBooks);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: message.INTERNAL_SERVER_ERROR });
        }
    },
};
