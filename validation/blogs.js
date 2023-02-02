


const blogData = () => {

    if (req.body.title === undefined || typeof(req.body.title) !== "string") {
        res.json({
          success: false,
          message: "A title is required and it must be a string"
        })
        //return   
    }

        if (req.body.text === undefined || typeof(req.body.text) !== "string") {
            res.json({
              success: false,
              message: "A text is required and it must be a string"
            })
            //return   
      }

      if (req.body.author === undefined || typeof(req.body.author) !== "string") {
        res.json({
          success: false,
          message: "An author is required and it must be a string"
        })
        //return  
      }
      if (req.body.title.length > 40) {
        res.json({
          success: false,
          message: "The title cannot be longer than 40 characters"
        })
        // return
    }

    if (req.body.author.length > 40) {
        res.json({
          success: false,
          message: "The author cannot be longer than 40 characters"
        })
        // return
    }

}



module.exports = { blogData }

       
      





