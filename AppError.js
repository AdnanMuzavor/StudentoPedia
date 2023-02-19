
//For example we acll a function in app which is not defined in the app

class AppError extends Error{
    constructor(errorCode,message,statusCode){
        super(message);
        this.errorCode=errorCode;
        this.statusCode=statusCode;
    }
}

module.exports=AppError;