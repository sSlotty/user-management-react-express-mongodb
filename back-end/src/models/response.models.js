const response = {}

response.success = (res, data, message, status) => {
    res.status(status).json({
        status: status,
        data: data,
        message: message
    })
}

response.error = (res, error, message, status) => {
    res.status(status).json({
        status: status,
        error: error,
        message: message
    })
}

module.exports = response;