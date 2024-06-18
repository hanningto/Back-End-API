export const myValidationSchema ={
    imageUrl: {
        isString :{
            errorMessage: "ImageUrl must be must be a string"
        },
        isURL: {
            errorMessage: "ImageUrl must be a valid url"
        }
    },
    title: {
        isString :{
            errorMessage: "title must be a string"
        }
    },
    price:{
        isInt: {
            errorMessage: "price must be an interger"
        }
    },
    date: {
        isString :{
            errorMessage: "date must be a string"
        },
        // isDate:{
        //     errorMessage: " Must be a valid date format"
        // }
    },
    location: {
        isString :{
            errorMessage: "location must be a string"
        }
    },
    company: {
        isString :{
            errorMessage: "company must be a string"
        }
    }
}

export const validateQuery = {
    filter: {
        isString: {
            errorMessage: "Filter must be a string"
        },
        notEmpty: {
            errorMessage: "Filter can not be empty"
        }
    },
    value: {
        notEmpty: {
            errorMessage: "filter can not be empty"
        }
    }
}

