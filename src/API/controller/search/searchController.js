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
            const getBooks = await book.find(query).select('name authorName subject language').skip(offset).limit(limit)

            return res.status(200).send(getBooks);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: message.INTERNAL_SERVER_ERROR });
        }
    },
    searchv3: async (req, res) => {
        try {
            const search = req.query.search;
            const searchObject = { $regex: new RegExp(search, "i") };
            console.log(searchObject);

            const suggestionsData = await book.find({
                $or: [
                    { name: searchObject },
                    { authorName: searchObject },
                    { subject: searchObject },
                    { language: searchObject },
                ]
            }, { _id: 0, __v: 0 }).limit(10);

            console.log(suggestionsData);

            const suggestedObject = new RegExp("^" + search, "i");
            console.log(suggestedObject);

            const matchedValues = suggestionsData
                .filter(book =>
                    book.name.match(suggestedObject) ||
                    book.authorName.match(suggestedObject) ||
                    book.subject.match(suggestedObject) ||
                    book.language.match(suggestedObject)
                ).map(book => [book.name, book.authorName, book.subject, book.language]).flat();


            const filteredValues = matchedValues.filter((value) => value.toLowerCase().match(suggestedObject));

            return res.status(200).send(filteredValues);
        } catch (err) {
            console.error(err);
            return res.status(500).send({ error: 'Internal server error' });
        }
    },
    searchv5: async (req, res) => {
        try {
            const filters = req.body.filters;
            const search = req.body.search;
            const pageNumber = req.body.pageNumber;
            const limit = req.body.limit || 10;
            const offset = (pageNumber - 1) * limit;

            const searchObject = { $regex: new RegExp(search, "i") };
            let query = {};

            if (!filters) {
                query.$or = [
                    { name: searchObject },
                    { authorName: searchObject },
                    { subject: searchObject },
                    { language: searchObject },
                ];
            }else{
                const arrayFilter = Object.keys(filters).map((key) => ({ [filters[key]]: searchObject }));
                query = { $or: arrayFilter };
            }
            const getBooks = await book.find(query, { _id: 0, __v: 0 }).skip(offset).limit(limit);
            return res.status(200).send(getBooks);
        }
        catch (err) {
            console.error(err);
            return res.status(500).send({ error: 'Internal server error' });
        }
    }
};
    