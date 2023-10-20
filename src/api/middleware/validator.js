const message = require('../../helper/messages.js');

module.exports = {
    validate : (schema) => (req, res, next) => {

        const validationResult = req.method === 'POST' ? schema.validate(req.body) : schema.validate(req.query);

        if (req.method === 'POST' & Object.keys(req.body).length === 0 || req.method === 'GET' & Object.keys(req.query).length === 0)
            return res.status(400).send(message.BAD_REQUEST)
        
        try {
            if (validationResult.error) {
                return res.status(422).json({ error : validationResult.error.details[0].message });
            }
        } catch (err) {
            res.status(500).send(message.INTERNAL_SERVER_ERROR);
        }
        next();
    }
};
