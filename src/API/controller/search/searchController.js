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
            console.log(searchObject)

            const suggestionsData = await book.find({
                $or: [
                    { name: searchObject },
                    { authorName: searchObject },
                    { subject: searchObject },
                    { language: searchObject },
                ]
            }, { _id: 0, __v: 0 }).limit(10);

            const matchedValues = suggestionsData.reduce((acc, book) => {
                if (book.name.match(searchObject)) {
                  acc.push(book.name);
                  console.log(acc)
                }
                if (book.authorName.match(searchObject)) {
                  acc.push(book.authorName);
                  console.log(acc)
                }
                if(book.subject.match(searchObject)){
                    acc.push(book.subject)
                    console.log(acc)
                }
                if(book.language.match(searchObject)){
                    acc.push(book.language)
                    console.log(acc)
                }
                return acc;
              }, []);

              const filteredValues = matchedValues.filter((value) => value.toLowerCase().includes('in'));

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

            if (!filters) {
                let query = {};
                query.$or = [
                    { name: searchObject },
                    { authorName: searchObject },
                    { subject: searchObject },
                    { language: searchObject },
                ];
                const getBooks = await book.find(query, { _id: 0, __v: 0 }).skip(offset).limit(limit);
                return res.status(200).send(getBooks);
            }

            const filterKeys = Object.keys(filters);
            const arrayFilter = filterKeys.map((key) => ({ [filters[key]]: searchObject }));

            console.log(arrayFilter);

            const query = { $or: arrayFilter };
            const getBooks = await book.find(query, { _id: 0, __v: 0 }).skip(offset).limit(limit);
            return res.status(200).send(getBooks);
        }
        catch (err) {
            console.error(err);
            return res.status(500).send({ error: 'Internal server error' });
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
    }
};

function queryResult(key, search, limit, offset) {
    return book.find({ key: search }).skip(offset).limit(limit);
}

// function getKeyByValue(object, value) {
//     return Object.keys(object).find(key => object[key] === value);
// }

async function queryResult(filterValue, search, limit, offset) {
    let query = {};
    query[filterValue] = new RegExp(search, "i");
    return await book.find(query, { _id: 0, __v: 0 }).skip(offset).limit(limit);
}

/*
const query = {
  $or: filters.map((field, index) => ({
    [field]: searchObjects[index]
  }))
};

*/
