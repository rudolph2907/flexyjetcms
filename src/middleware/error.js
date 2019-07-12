const httpStatus = require('http-status')
const env = (process.env.NODE_ENV = process.env.NODE_ENV || 'development')

/**
 * Error handler. Send stacktrace only during development
 * @public
 */
const handler = (err, req, res, next) => {
  const response = {
    code: err.status,
    message: err.message || httpStatus[err.status],
    errors: err.errors,
    stack: err.stack
  }

  if (env !== 'development') {
    delete response.stack
  }

  res.status(err.status)
  res.json(response)
}
exports.handler = handler

exports.converter = (err, req, res, next) => {
  let convertedError = err

  // if (err instanceof expressValidation.ValidationError) {
  //   convertedError = new APIError({
  //     message: 'Erro de Validação',
  //     errors: err.errors,
  //     status: err.status,
  //     stack: err.stack,
  //   });
  // } else if (!(err instanceof APIError)) {
  //   convertedError = new APIError({
  //     message: err.message,
  //     status: err.status,
  //     stack: err.stack,
  //   });
  // }

  return handler(convertedError, req, res)
}

/**
 * Catch 404 and forward to error handler
 * @public
 */
exports.notFound = (req, res, next) => {
  const err = new Error({
    message: 'Not found',
    status: httpStatus.NOT_FOUND
  })
  return handler(err, req, res)
}
