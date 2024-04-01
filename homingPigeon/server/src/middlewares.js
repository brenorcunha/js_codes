
//NOT FOUND MIDDLEWARE: Se a URL não for encontrada, exibe a msg, corrige status da req e passa adiante.
const notFound = (req, res, next) => {
    const error = new Error(`Not found ${req.originalUrl}`);
    res.status(404);
    next(error);
  };
  //ERROR HANDLING MIDDLEWARE: Se a req chegar com status 200 (success) significa que não foi tratada, então coloca status de erro e retorna tudo.
  const errorHandling = (error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.statusCode = statusCode;
    res.json({
      message: error.message,
      trace:
        process.env.NODE_ENV === "production"
          ? "Not allowed infos, sorry..."
          : error.trace,
    });
  };

module.exports = { notFound, errorHandling};