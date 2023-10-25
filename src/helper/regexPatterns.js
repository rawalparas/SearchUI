const name = /^(?=.{1,50}$)[a-zA-Z+%.-]+(?:\s[a-zA-Z.-]+)*$/;  
const author = /^(?=.{2,30}$)[a-zA-Z.,-]+(?:\s[a-zA-Z,.-]+)*$/;   
const price = /^[0-9]{1,6}$/;
const subject = /^(?=.{1,30}$)[a-zA-Z+%.]+(?:\s[a-zA-Z]+)*$/;    
const language = /^(?=.{1,30}$)[a-zA-Z+%.]+(?:\s[a-zA-Z]+)*$/;
const Id = /^[a-f\d]{24}$/i;

module.exports = {
    name , 
    author , 
    price , 
    subject ,
    language,
    Id,
}