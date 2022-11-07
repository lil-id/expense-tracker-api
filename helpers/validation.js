class _validate {
    validation = (schema, body) => {
        const checkValidation = schema.validate(body)

        if (checkValidation.error) {
            const errorDetails = checkValidation.error.details.map((detail) => detail.message)

            return {
                status: false,
                code: 422,
                error: errorDetails.join(", ")
            }
        }

        return {
            status: true
        }
    }
}

module.exports = new _validate