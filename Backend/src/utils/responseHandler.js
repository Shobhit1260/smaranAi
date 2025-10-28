class ResponseHandler {
/**
 * @typedef {Object} SuccessResponse
 * @property {boolean} success
 * @property {string} message
 * @property {any} data
 */

/**
 * Sends a success response.
 * @param {import('express').Response} res
 * @param {any} data
 * @param {string} [message]
 * @param {number} [statusCode]
 * @returns {import('express').Response}
 */
static success(res, data, message = 'Success', statusCode = 200) {
    return res.status(statusCode).json({
        success: true,
        message,
        data
    });
}

  /**
     * @param {{ status: (arg0: number) => { (): any; new (): any; json: { (arg0: { success: boolean; message: string; errors: null; }): any; new (): any; }; }; }} res
     */
  static error(res, message = 'Error occurred', statusCode = 500, errors = null) {
    return res.status(statusCode).json({
      success: false,
      message,
      errors
    });
  }

  /**
     * @param {import("express").Response<any, Record<string, any>>} res
     * @param {any} data
     */
  static created(res, data, message = 'Resource created successfully') {
    return this.success(res, data, message, 201);
  }

  /**
     * @param {any} res
     */
  static unauthorized(res, message = 'Unauthorized access') {
    return this.error(res, message, 401);
  }

  /**
     * @param {any} res
     */
  static forbidden(res, message = 'Forbidden access') {
    return this.error(res, message, 403);
  }

  /**
     * @param {any} res
     */
  static notFound(res, message = 'Resource not found') {
    return this.error(res, message, 404);
  }

  /**
     * @param {any} res
     */
  static badRequest(res, message = 'Bad request', errors = null) {
    return this.error(res, message, 400, errors);
  }
}

module.exports = ResponseHandler;