const message = require('../../../helper/messages.js');
const book = require('../../../model/bookModel.js');
const mongoose = require('mongoose');

module.exports = {
    search : async(req , res) => {
        try{
            const field = req.query.field;
            console.log(field);
            const pageNumber = req.query.pageNumber;
            const limit = 2;
            const offset = (pageNumber-1) * limit;
            const getBooks = await book.find({ $or : [{name : field} , {authorName : field }, {subject : field}]}).skip(offset).limit(limit);
            return res.send(getBooks);
        }catch(err){
            return res.status(500).json({error : message.INTERNAL_SERVER_ERROR});
        }
    }
}