const express = require('express');
const router = express.Router();
// Import of validation function from validation/blogs
const {validateBlogData} = require('../validation/blogs');


const blogs = [
    {
          title: "dicta",
      text: "Iusto et in et. Nulla accusantium fugit. Et qui dolorem inventore soluta et veritatis. Aut ut aut non laudantium eveniet suscipit odit. Sapiente sint nihil nihil sit et molestias. In nisi omnis quas et sed aut minus aperiam ea.\n \rLaudantium quo quisquam quae. Et et quas officia perspiciatis iusto sunt sunt eaque. Quidem sit voluptas deserunt sequi magni.\n \rEst est facere cumque ipsam omnis animi. Voluptatem magnam officiis architecto possimus. Quia similique aut eos qui. Quasi quae sed aliquam.",
      author: "Darren Abbott",
      category: ["Lorem", "sit", "amet"],
      createdAt: "2022-03-22T10:36:37.176Z",
      lastModified: "2022-03-22T10:36:37.176Z",
    },
    {
          title: "ducimus",
      text: "Placeat ea et fuga. Qui itaque quibusdam nam. Maxime nobis quam. Et laudantium sunt incidunt reiciendis.\n \rEarum aut sed omnis autem aliquam architecto corporis sint. Nostrum cumque voluptatem aperiam alias similique. Tenetur et esse omnis praesentium ipsum alias. Impedit rerum qui quia quaerat architecto mollitia est autem. Qui blanditiis earum et qui dolorum reprehenderit. Debitis est temporibus.\n \rEt nam sed. Corporis ut rerum. Ut qui dolore est dolorem ex.",
      author: "Luke Rogahn PhD",
      category: ["Lorem", "ipsum"],
      createdAt: "2022-03-22T15:16:56.285Z",
      lastModified: "2022-03-22T15:16:56.285Z",
    },
    {
          title: "quod",
      text: "Accusamus nisi eos. Tenetur earum tenetur nemo. Qui voluptas temporibus repellendus maxime. Ipsum optio voluptate enim nihil. Ea et dolorem. Omnis unde perspiciatis.\n \rUt odio eaque. Harum non placeat. Eveniet molestiae in cupiditate dolor doloremque rerum eligendi aut ab.\n \rMolestias eligendi et. Nemo velit natus autem numquam atque provident et nulla. In et dolores ad nihil. Delectus quis doloremque asperiores similique. Asperiores id nam vitae nobis labore autem. Dolor aperiam provident quia consectetur aut ut.",
      author: "Maryann Schneider",
      category: ["Lorem", "ipsum", "dolor", "sit", "amet"],
      createdAt: "2022-03-21T20:09:32.298Z",
      lastModified: "2022-03-21T20:09:32.298Z",
    },
    {
          title: "ut",
      text: "Itaque necessitatibus repudiandae. Porro suscipit exercitationem qui atque. Perferendis suscipit debitis sint aut dignissimos nobis ut. Modi ea nihil est vel consequuntur voluptatem. In magnam delectus in eos reiciendis sit est enim eligendi. Sint dicta at.\n \rConsectetur aspernatur alias sed non explicabo blanditiis laborum fugit voluptate. Reiciendis iste aut sit natus qui et in ratione. Placeat qui in voluptatum autem nulla ratione. Commodi sit alias sint sapiente rem. Quia sapiente minus deleniti vitae.\n \rExercitationem numquam omnis maxime dolorum sed deserunt suscipit laudantium. Ad et autem voluptatem esse laudantium et. Id fuga accusamus est sapiente dicta.",
      author: "Dr. Lorenzo Anderson",
      category: ["ipsum", "dolor", "sit", "amet"],
      createdAt: "2022-03-21T23:07:53.447Z",
      lastModified: "2022-03-21T23:07:53.447Z",
    },
    {
          title: "id",
      text: "Porro officia aliquid fugiat sed reprehenderit illo amet doloribus sed. Molestiae vero et. Quae voluptates dolores. Voluptatem facere fuga. Veniam perferendis illo ut sunt earum deleniti.\n \rIusto neque dolorem esse error. Saepe et quia ut corrupti. Autem repellendus similique dolorem sunt in ipsa perferendis. Et excepturi ut voluptatem deserunt accusantium dolores aperiam cum ut.\n \rDoloremque expedita sit et voluptatem unde libero. Numquam beatae sed repellat iusto doloribus fugit tenetur. Possimus et ut adipisci harum voluptatem provident consequatur. Corporis quo aut vel itaque blanditiis illum.",
      author: "Bobbie Dach",
      category: ["amet"],
      createdAt: "2022-03-22T15:14:39.819Z",
      lastModified: "2022-03-22T15:14:39.819Z",
    },
  ]
 // Gets all blogData entries
  router.get('/all', function(req,res){
          
    res.json({ success:true, 
               blogs:blogs
             })
  });

  // Gets a single blog entry from array of blog objects
  router.get('/single/:title', function(req,res){

    const singleBlog = blogs.find((blog)=>{
		return blog.title === req.params.title
	})

   res.json({success:true, 
             singleBlog
            })

  });

  //Deletes a given blog by way of title
  router.delete('/delete/:title', function(req,res){
    const blogToDelete = req.params.title

    const deleteBlogIndex = blogs.findIndex((blog) => {
        return blog.title === blogToDelete
    })

    blogs.splice(deleteBlogIndex,1)

    res.json({success:true, 
              deleteBlogIndex
            })
  });

  // Posts a new blog object entry within array of blog entry objects
  router.post('/create-one/', function(req,res){

  try {
    
     const newBlog = {}

     newBlog.title = req.body.title,
     newBlog.text = req.body.text,
     newBlog.author = req.body.author,
     newBlog.category = req.body.category,
     newBlog.createdAt = new Date(),
     newBlog.lastModified = new Date()

    const userDataCheck = validateBlogData(newBlog)

  if (userDataCheck.isValid === false) {
    throw Error(userDataCheck.message)
  }

  console.log(newBlog)
  blogs.push(newBlog)

 // In the catch block, we always want to do 2 things: console.log the error and respond with an error object
  } catch (e) {
		

    console.log(e);
    res.json({success: false,
			        error: String(e)
	          });
  }
  res.json({success: true,
          })
});


// Puts a modication of a given blog object entry by way of title
router.put('/update-one/:title',function(req,res){

    const blogToUpdate = req.params.title
    
    const originalBlog = blogs.find((blog) => {
    return blog.title === blogToUpdate
  })

  const originalBlogIndex = blogs.findIndex((blog) => {
    return blog.title === blogToUpdate
  })

try {
  
  const updatedBlog = {}

   //title
  if (req.body.title !== undefined) {
    updatedBlog.title = req.body.title
  } else {updatedBlog.title = originalBlog.title}

  //text
  if (req.body.text !== undefined) {
    updatedBlog.text = req.body.text
  } else {updatedBlog.text = originalBlog.text}

  //author
  if (req.body.author !== undefined) {
    updatedBlog.author = req.body.author
  } else {updatedBlog.author = originalBlog.author}

  //category
  if (req.body.category !== undefined) {
    updatedBlog.category = req.body.category
  } else {updatedBlog.category = originalBlog.category}

  // Checks validity of blogData by way of function in validation/blogs.js
  const userDataCheck = validateBlogData(updatedBlog)

  if (userDataCheck.isValid === false) {
  throw Error(userDataCheck.message)
  }
  console.log(originalBlogIndex)

  blogs[originalBlogIndex] = updatedBlog
  updatedBlog.createdAt = originalBlog.createdAt
  updatedBlog.lastModified = new Date()
  console.log(updatedBlog)

// In the catch block, we always want to do 2 things: console.log the error and respond with an error object
} catch (e) {
		
    console.log(e);

    res.json({
			success: false,
			error: String(e)
		        });
}
res.json({success: true,
        })
});

 
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;