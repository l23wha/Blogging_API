require('dotenv').config();

const epxress=require('express');
const monggose=require('mongoose');
const cors=require('cors');
const { default: mongoose } = require('mongoose');

const app=epxress();
app.use(epxress.json());
app.use(cors());

//1. Define Blog post schema and Model

const postSchema=new monggose.Schema({
      title:{type:String,required:true,trim:true},
      content:{type:String,required:true},
      category:{type:String,required:true,trim:true},
       tags:{type:[String],default:[]}
},{timestamps:true});

const Post=monggose.model('Post',postSchema);

//2. Create a new blog post 
app.post('/posts',async(req,res)=>{
       try{
         const {title,content,category,tags}=req.body;

         //Basic validation
         if(!title || !content || !category){
             return res.status(400).json({error:"Title,content,and category are required."})
         };

         const newPost=new Post({title,content,category,tags});
         const savedPost=await newPost.save();

         return res.status(201).json(savedPost);


       }catch(error){
         console.error(error);
          return res.status(500).json({error:"Internal Server error while creating post."})
       }
})


// Get all blog post or filter by search item

app.get('/posts',async(req,res)=>{
      try{
         const {term}=req.query;
         let query={};

         // Wildcard search on title,content or category
         if(term){
             const regex=new RegExp(term,'i');
             query={
                 $or:[
                    {title:regex},
                    {content:regex},
                    {category:regex}
                 ]
             }
         }

         const posts=await Post.find(query).sort({createdAt:-1});
          return res.status(200).json(posts);

      }catch(error){
          console.error(error);
          return res.status(500).json({error:"Internal Server error while fetching posts"})
      }
});

//4. Get a single blog post by ID
app.get('/posts/:id',async(req,res)=>{
      try{
         const {id}=req.params;

           if(!mongoose.Types.ObjectId.isValid(id)){
             return res.status(404).json({error:"Blog post not found (Invalid id fromat) "});
           }

           const post=await Post.findById(id);
           if(!post){
             return res.status(404).json({error:"Blog post are not found"});
           }

           return res.status(200).json(post);
      }catch(error){
         console.error(error);
          return res.status(500).json({error:"Internal Server error while fetching the post"});
      }
});

//5. Update an existing blog post (PUT /post/:id)

app.put('/put/:id',async(req,res)=>{
     try{
         const {id}=req.params;
         const {title,content,category,tags}=req.body;

         if(!monggose.Types.ObjectId.isValid(id)){
             return res.status(404).json({error:"Blog post not found (Invalid id format)"});
         };

         if(!title || !content|| !category){
             return res.status(404).json({error:"Title,content,and category are required for update"});
         }

         const updatedPost=await Post.findByIdAndUpdate(
             id,
             {title,content,category,tags},
             {new:true,runValidators:true}
         )

         if(!updatedPost){
               return res.status(404).json({error:"Blog post not found"});
         }

          return res.status(200).json(updatedPost);

     }catch(error){
          console.error(error);
           return res.status(500).json({error:"Internal server error while updating the post"});
     }
});

// Delete a blog post 

app.delete('/delete/:id',async(req,res)=>{
     
    try{
         const {id}=req.params;

         if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error:"Blog post are not found (Invalid id format)"});
         }

         const deletedPost=await Post.findByIdAndDelete(id);
          if(!deletedPost){
             return res.status(404).json({error:"Blog not found"});
          };

          return res.status(204).send();
    }catch(error){
         console.error(error);
          return res.status(500).json({error:"Internal Server error while deleting the post"})
    }
});


//7 Connect databases and start server

const PORT=process.env.PORT||3000;
 const MONGO_URI=process.env.MONGO_URI


 monggose.connect(MONGO_URI).then(()=>{
     console.log('Connected to MongoDb');
     app.listen(PORT,()=>{
         console.log(`Bloggind API server running on Port ${PORT}`);
     })
 }).catch((err)=>{
     console.error("Database connection error",err);
 })
