const successResponse = (res, data) => res.json({
    data,
});

const errorResponse = (res, message) => res.status(500).json({
    message,
});

const unauthorizedResponse = res => res.status(401).json({
    message: 'Unauthorized access token',
});

module.exports = {
    successResponse,
    errorResponse,
    unauthorizedResponse,
};
