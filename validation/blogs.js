


const validateBlogData = (blogData) => {

    if (blogData.title === undefined || typeof(blogData.title) !== "string") {
        return {
          isValid: false,
          message: "A title is required and it must be a string"
        }
        }
        

        if (blogData.text === undefined || typeof(blogData.text) !== "string") {
          return {
            isValid: false,
              message: "A text is required and it must be a string"
      }
              
      }


      if (blogData.author === undefined || typeof(blogData.author) !== "string") {
        return {
          isValid: false,
          message: "An author is required and it must be a string"
        }
        
      }
      if (blogData.title.length > 40) {
        return {
          isValid: false,
          message: "The title cannot be longer than 40 characters"
        }
    }

    if (blogData.author.length > 40) {
        return {
          isValid: false,
          message: "The author cannot be longer than 40 characters"
        }
    }

    if(blogData.category === undefined || blogData.category.length <= 0 ){
      return {
        isValid: false,
        message: "The category must be defined and greater than 0"
      }
    }

      if(blogData.category.length > 10 ){
        return {
          isValid: false,
          message: "There can be no more than 10 category entries and they must be strings"
        }
      }
 
      


    






   return { 
     isValid: true
          }
}

module.exports = { validateBlogData }


