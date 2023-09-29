const bookName = /^(?=.{1,50}$)[a-zA-Z+%.]+(?:\s[a-zA-Z]+)*$/;  
const authorName = /^(?=.{2,30}$)[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;   
const price = /^[0-9]{1,6}$/;
const subject = /^(?=.{1,30}$)[a-zA-Z+%.]+(?:\s[a-zA-Z]+)*$/;    
const language = /^[a-zA-Z]{1,10}$/;
const languageModel = /^(?=.{1,30}$)[a-zA-Z+%.]+(?:\s[a-zA-Z]+)*$/;
const Id = /^[a-f\d]{24}$/i;

module.exports = {
    bookName , 
    authorName , 
    price , 
    subject ,
    language,
    Id,
    languageModel
}