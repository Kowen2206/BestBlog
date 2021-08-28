import boom from '@hapi/boom';

const { ENV } = require('../../config');


//determina si mostrar el stack o no.
function withErrorStack(error, stack){
    if(ENV === 'development'){
        return { ...error, stack}
    }
    return error;
}

//middleware encargado de mostrar el error en un console.log
function logErrors(err, req, res, next){
    console.log('error handler');
    next(err);
}

//Sí el error se trata de un error boom, devuelve un error con las características de un object boom, si no, ejecuta el middleware de error de express.
function wrapErrors(){
    if(!err.isBoom){
        next(boom.badImplementation(err));
    }
    next(err);
}

//middleware encargado de manejar el error
//Usa la sintaxis para manejar errores con expres err,req,res,next
function errorHandler(err, req, res, next){ 
    const{ output: {statusCode, payload}} = err;
    res.status(statusCode);
    //res.json se encarga de darnos la respuesta en formato json, ya que por defecto esta viene en html.
    //ejecuta el metodo withErrorStack el cual decide si se trata de un error boom.
    res.json(withErrorStack(payload, err.stack))
}

export default {
    logErrors,
    wrapErrors,
    errorHandler
}

