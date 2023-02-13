const express = require('express');
const router = express.Router();
// Import of validation function from validation/blogs
const {validateBlogData} = require('../validation/blogs');

//instantiate mongodb 
const { db } = require('../mongo');


/* GET users listing. */
router.get('/all', async function(req, res, next) {
  const blogs = await db()
  .collection('sample_blogs')
  .find({})
  //.limit(5)
  .toArray(function(err, result){
      if (err) {
        res.status(400).send("error fetching blogs")
      } else {
        res.json(result);
      }
    }); 

    res.json({
      sucess:true,
      blogs: blogs
    });
});



router.get('/get-one/', async function(req, res, next) {
  const blogs = await db()
  .collection('sample_blogs')
  .find({})
  .limit(1)
  .toArray(function(err, result){
      if (err) {
          res.status(400).send("error fetching blogs")
      } else {
          res.json(result);
      }
      }); 
  
      res.json({
        sucess:true,
        blogs: blogs
      });
});


router.get('/get-one/:author', async function(req, res, next) {
  const blogs = await db()
  .collection('sample_blogs')
  .find({author: req.params.author})
  .toArray(function(err, result){
      if (err) {
         res.status(400).send("error fetching blogs")
          } else {
            res.json(result);
        }
        }); 
    
        res.json({
          sucess:true,
          blogs: blogs
        });
      });


    router.get('/single/:id', async function(req, res, next) {
      const blogs = await db()
      .collection('sample_blogs')
      .find({id:req.params.id})
      .toArray(function(err, result){
          if (err) {
            res.status(400).send("error fetching blogs")
          } else {
            res.json(result);
          }
        }); 

      res.json({
          sucess:true,
          blogs: blogs
       });
       });


      router.post('/create-one/', async function(req, res, next) {
  try {
       let newBlogPost = 
      {   title : req.body.title,
           text : req.body.text,
           author : req.body.author,
           category : req.body.category,
           createdAt : new Date(),
           lastModified : new Date()
      };
      const userDataCheck = validateBlogData(newBlogPost)
        if (userDataCheck.isValid === false) {
        throw Error(userDataCheck.message)
      }
      const blogs = await db()
        .collection('sample_blogs')
        .insertOne({ newBlogPost
           
      });
      } catch (e) {
		    console.log(e);

        res.json({success: false,
           error: String(e)
      });
      }
      res.json({
              sucess:true,
      });
      });


    router.get('/all-sorted', async function(req, res, next) {
        const blogs = await db()
        .collection('sample_blogs')
        .find({})
        .sort({author: 1})
        .toArray(function(err, result){
            if (err) {
              res.status(400).send("error fetching blogs")
            } else {
              res.json(result);
            }
          }); 
      
          res.json({
            sucess:true,
            blogs: blogs
          });
      });


      router.get('/delete-multi', async function(req, res, next) {
      try {
        const blogs = await db()
        .collection('sample_blogs')
        .deleteMany({"newBlogPost.author": "Odin"})
        
      } catch (e) {
           print (e);
      }
       res.json({
            sucess:true,
      });
      });


  
        
          
          
        
          
     



      
      
      
      
      
      
      
      
      
      
      
      
      
      
    

  // router.get('/', async function(req, res, next) {
  //   const blogs = await db()
  //   .collection('sample_blogs')
  //   .find({})
  //   .limit(5)
  //   .toArray(function(err, result){
  //       if (err) {
  //         res.status(400).send("error fetching blogs")
  //       } else {
  //         res.json(result);
  //       }
  //     }); 
  
  //     res.json({
  //       sucess:true,
        
  //       blogs: blogs
  //     });
  //   });







// // Gets all blogData entries
// router.get('/all', function(req,res){
          
//   res.json({ success:true, 
//              blogs:blogs
//            })
// });
// // Gets a single blog entry from array of blog objects
// router.get('/single/:title', function(req,res){
//   const singleBlog = blogs.find((blog)=>{
//   return blog.title === req.params.title
// })
//  res.json({success:true, 
//            singleBlog
//           })
// });
// //Deletes a given blog by way of title
// router.delete('/delete/:title', function(req,res){
//   const blogToDelete = req.params.title
//   const deleteBlogIndex = blogs.findIndex((blog) => {
//       return blog.title === blogToDelete
//   })
//   blogs.splice(deleteBlogIndex,1)
//   res.json({success:true, 
//             deleteBlogIndex
//           })
// });
// // Posts a new blog object entry within array of blog entry objects
// router.post('/create-one/', function(req,res){
// try {
  
//    const newBlog = {}
//    newBlog.title = req.body.title,
//    newBlog.text = req.body.text,
//    newBlog.author = req.body.author,
//    newBlog.category = req.body.category,
//    newBlog.createdAt = new Date(),
//    newBlog.lastModified = new Date()
//   const userDataCheck = validateBlogData(newBlog)
// if (userDataCheck.isValid === false) {
//   throw Error(userDataCheck.message)
// }


// console.log(newBlog.category.length);
// console.log(newBlog.category);
// console.log(newBlog);
// blogs.push(newBlog);


//  // In the catch block, we always want to do 2 things: console.log the error and respond with an error object
// } catch (e) {
		
//   console.log(e);
//   res.json({success: false,
//             error: String(e)
//           });
// }
// res.json({success: true,
//         })
// });
// // Puts a modication of a given blog object entry by way of title
// router.put('/update-one/:title',function(req,res){
//   const blogToUpdate = req.params.title
  
//   const originalBlog = blogs.find((blog) => {
//   return blog.title === blogToUpdate
// })
// const originalBlogIndex = blogs.findIndex((blog) => {
//   return blog.title === blogToUpdate
// })
// try {

// const updatedBlog = {}
//  //title
// if (req.body.title !== undefined) {
//   updatedBlog.title = req.body.title
// } else {updatedBlog.title = originalBlog.title}
// //text
// if (req.body.text !== undefined) {
//   updatedBlog.text = req.body.text
// } else {updatedBlog.text = originalBlog.text}
// //author
// if (req.body.author !== undefined) {
//   updatedBlog.author = req.body.author
// } else {updatedBlog.author = originalBlog.author}
// //category
// if (req.body.category !== undefined) {
//   updatedBlog.category = req.body.category
// } else {updatedBlog.category = originalBlog.category}
// // Checks validity of blogData by way of function in validation/blogs.js
// const userDataCheck = validateBlogData(updatedBlog)
// if (userDataCheck.isValid === false) {
// throw Error(userDataCheck.message)
// }
// console.log(originalBlogIndex)
// blogs[originalBlogIndex] = updatedBlog
// updatedBlog.createdAt = originalBlog.createdAt
// updatedBlog.lastModified = new Date()
// console.log(updatedBlog)
// // In the catch block, we always want to do 2 things: console.log the error and respond with an error object
// } catch (e) {
  
//   console.log(e);
//   res.json({
//     success: false,
//     error: String(e)
//           });
// }
// res.json({success: true,
//       })
// });

// /* GET users listing. */
// router.get('/', function(req, res, next) {
// res.send('respond with a resource');
// });
 module.exports = router;