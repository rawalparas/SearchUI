const bookName = /^(?=.{1,50}$)[a-zA-Z+%.]+(?:\s[a-zA-Z]+)*$/;   // 1 , 50
const authorName = /^(?=.{2,30}$)[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;    // 2 , 30
const price = /^[0-9]{1,6}$/;
const subject = /^(?=.{1,30}$)[a-zA-Z+%.]+(?:\s[a-zA-Z]+)*$/;    // 1 , 25
const language = /^[a-zA-Z]{1,10}$/;

module.exports = {
    bookName , 
    authorName , 
    price , 
    subject ,
    language
}