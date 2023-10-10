module.exports = {
    validateName(regex, value) {
        return regex.test(value);
    },

    validateMessageName(regex, props) {
        console.log(regex);
        console.log(props);
        // if (props.charAt(0) == ' ' || props.charAt(props.length - 1) == ' ')
        //     return `${props.value} : ${message.NOT_CONTAIN_SPACES_AT_START_AND_END}`
        // if (props.length < 2 || props.length > 50)
        //     return `${props.value} : ${message.INVALID_LENGTH}`
        // if (!regex.test(props))
        //     return `${props} : ${message.MUST_NOT_CONTAIN_SPEC_CHAR_AND_NUM}`
        // return message.INVALID_FORMAT;
    }
}