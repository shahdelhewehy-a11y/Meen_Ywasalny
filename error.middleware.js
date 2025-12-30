const { errorResponse } = require('../utils/response.helper');

const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);
    
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return errorResponse(res, 'Invalid JSON payload', 400);
    }
    
    if (err.code === 'EREQUEST') {
        return errorResponse(res, 'Database query error', 500);
    }
    
    if (err.code === 'ETIMEOUT') {
        return errorResponse(res, 'Database timeout', 503);
    }
    
    return errorResponse(res, err.message || 'Internal server error', 500);
};

const notFoundHandler = (req, res, next) => {
    return errorResponse(res, `Route ${req.originalUrl} not found`, 404);
};

module.exports = {
    errorHandler,
    notFoundHandler
};