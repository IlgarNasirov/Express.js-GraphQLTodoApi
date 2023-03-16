exports.get404=(request, response, next)=>{
    response.status(404).json({
        message: 'Not Found!'
    });
};

exports.get500=(error, request, response, next)=>{
    const message=error.message;
    const data=error.data;
    response.status(error.statusCode||500)
    .json({
        message: message,
        data: data
    });
};