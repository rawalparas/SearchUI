const message = require("../../../helper/messages.js");
const book = require("../../../model/bookModel.js");

module.exports = {
    search: async (req, res) => {
        try {
            // all the params are come in the request.
            const search = req.query.search;
            const name = req.query.name;
            const author = req.query.author;
            const language = req.query.language;
            const subject = req.query.subject;
            const pageNumber = req.query.pageNumber;
            const limit = req.query.limit || 10;
            const offset = (pageNumber - 1) * limit;

            let query = {};

            if (author) {
                query = { authorName: { $regex: new RegExp(search, "i") } };
            }
            else if (name) {
                query = { name: { $regex: new RegExp(search, "i") } };
            }
            else if (subject) {
                query = { subject: { $regex: new RegExp(search, "i") } };
            }
            else if (language) {
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
    searchv2: async (req, res) => {
        try {
            // all the params are come in the request.
            const search = req.query.search;
            const pageNumber = req.query.pageNumber;
            const limit = req.query.limit || 5;
            const offset = (pageNumber - 1) * limit;

            let query = {};

            let getBooks = {};

            for (var key in req.query) {
                if (req.query[key] == 'true') {
                    query[key] = new RegExp(search, "i");
                    getBooks = await book.find(query, { _id: 0, __v: 0 }).skip(offset).limit(limit);
                }
                else {
                    query.$or = [
                        { name: { $regex: new RegExp(search, "i") } },
                        { authorName: { $regex: new RegExp(search, "i") } },
                        { subject: { $regex: new RegExp(search, "i") } },
                        { language: { $regex: new RegExp(search, "i") } },
                    ];
                    getBooks = await book.find(query, { _id: 0, __v: 0 }).skip(offset).limit(limit);
                }
            }

            return res.status(200).send(getBooks);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: message.INTERNAL_SERVER_ERROR });
        }
    },
    searchv3: async (req, res) => {
        try {
            // all the params are come in the request.
            const search = req.query.search;
            const pageNumber = req.query.pageNumber;
            const limit = req.query.limit || 5;
            const offset = (pageNumber - 1) * limit;

            const queryField = req.query;

            var key = getKeyByValue(queryField, 'true');

            let query = {}
            let getBooks = {};

            if (key)
                query[key] = new RegExp(search, "i");

            else
                query.$or = [
                    { name: { $regex: new RegExp(search, "i") } },
                    { authorName: { $regex: new RegExp(search, "i") } },
                    { subject: { $regex: new RegExp(search, "i") } },
                    { language: { $regex: new RegExp(search, "i") } },
                ];

            getBooks = await book.find(query, { _id: 0, __v: 0 }).skip(offset).limit(limit);
            return res.status(200).send(getBooks);

        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: message.INTERNAL_SERVER_ERROR });
        }
    },
    searchv4: async (req, res) => {
        try {
            const filters = req.query.filters;
            const search = req.query.search;
            const pageNumber = req.query.pageNumber;
            const limit = req.query.limit || 10;
            const offset = (pageNumber - 1) * limit;

            let getBooks = [];

            for (const key in filters) {
                const filterValue = filters[key];
                const result = await queryResult(filterValue, search, limit, offset);
                getBooks.push(result);
            }
            return res.status(200).send(getBooks);
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({ error: message.INTERNAL_SERVER_ERROR });
        }
    },
    searchv5 : async(req , res) =>  {
        try{
            const filters = req.query.filters;
            const search = req.query.search;
            const pageNumber = req.query.pageNumber;
            const limit = req.query.limit || 10;
            const offset = (pageNumber -1) * limit;

            // const field = filters.length()
            // console.log(filters.length)
            // console.log(field);

            let query = {};
            if (filters.includes('all')){
                query.$or = [
                    { name: { $regex: new RegExp(search, "i") } },
                    { authorName: { $regex: new RegExp(search, "i") } },
                    { subject: { $regex: new RegExp(search, "i") } },
                    { language: { $regex: new RegExp(search, "i") } },
                ];
            }

        }
        catch(err){

        }

    }
};

function queryResult(key, search, limit, offset) {
    return book.find({ key: search }).skip(offset).limit(limit);
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

async function queryResult(filterValue, search, limit, offset) {
    let query = {};
    query[filterValue] = new RegExp(search, "i");
    return await book.find(query, { _id: 0, __v: 0 }).skip(offset).limit(limit);
}