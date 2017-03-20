
//request was executed with success
exports.success = function(data){
    this.status(200).send(data)
}

//validation error or missing data
exports.badRequest = function(errors){

    let response = {
        errors: []
    }
    
    let errorsString = ''
    for(var key in errors) {
        response.errors.push({
            field: key,
            message: errors[key][0]   
        })
    }

    this.status(400).send(response)

}

//no token proviced
exports.noToken = function(){
    let response = {
        errors: [{
            message: 'Missing Token'
        }]
    }
    this.status(401).send(response)

}

//wrong api token
exports.unauthorized = function(){
    let response = {
        errors: [{
            message: 'Invalid Token'
        }]
    }
    this.status(401).send(response)

}

//token expired
exports.tokenExpired = function(){
    let response = {
        errors: [{
            message: 'Token Expired'
        }]
    }
    this.status(401).send(response)

}

//wrong api token
exports.invalidCredentials = function(){
    let response = {
        errors: [{
            message: 'Invalid Credentials'
        }]
    }
    this.status(401).send(response)

}

//wrong facebook token
exports.invalidFacebookToken = function(){
    let response = {
        errors: [{
            field: 'token',
            message: 'Invalid OAuth token signature'
        }]
    }
    this.status(401).send(response)

}

//wrong instagram token
exports.invalidInstagramToken = function(){
    let response = {
        errors: [{
            field: 'token',
            message: 'Invalid OAuth token signature'
        }]
    }
    this.status(401).send(response)

}

//error sending email
exports.errorSendingEmail = function(error){
    let response = {
        errors: [{
            message: 'Error sending email'   
        }]
    }
    this.status(500).send(response)

}

//invalid paypal email
exports.invalidPayPalEmail = function(error){
    let response = {
        errors: [{
            field: 'email',
            message: 'Invalid Email'
        }]
    }
    this.status(400).send(response)

}

//invalid file
exports.wrongFile = function(){
    let response = {
        errors: [{
            message: 'Wrong File Provided'
        }]
    }
    this.status(400).send(response)

}

//route was not found
exports.notFound = function(){
    let response = {
        errors: [{
            message: 'Not Found'
        }]
    }
    this.status(404).send(response)

}