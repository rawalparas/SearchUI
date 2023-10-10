const message = require('../helper/messages.js');

module.exports = {
    validateName(value, regex) {
        console.log(regex)

        return regex.test(value);
    },
    validateMessageName(props, regex) {
        if (props.value.charAt(0) === ' ' || props.value.charAt(props.length - 1) === ' ') {
            return `${props} : ${message.NOT_CONTAIN_SPACES_AT_START_AND_END}`;
        }
        if (props.length < 2 || props.length > 50) {
            return `${props} : ${message.INVALID_LENGTH}`;
        }
        if (!regex.test(props)) {
            return `${props} : ${message.MUST_NOT_CONTAIN_SPEC_CHAR_AND_NUM}`;
        }
        return `${props} : ${message.INVALID_FORMAT}`;
    }
};
