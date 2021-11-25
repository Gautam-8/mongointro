const express = require("express");
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const connect = () => {
    return mongoose.connect("mongodb://localhost:27017/entertainment", { useNewUrlParser: true ,useUnifiedTopology: true});
}


const movieSchema = new mongoose.Schema({

    id:{type:Number, required:true },
    movie_name:{type:String, required:true},
    movie_genre:{type:String, required:true},
    production_year:{type:Number, required:false,default:"Male"},
    budget:{type:Number, required:true}
},
{
    versionKey:false,
    timestamps:true,
}
);

const Movie = mongoose.model("movie",movieSchema);

app.post("/movies",async(req,res) =>{

    try{
    const movie = await Movie.create(req.body);
    return res.status(201).send(movie);
    }
    catch(e){
      return  res.status(500).send({status:e.message})
    }
});

app.get("/movies",async(req,res) =>{

    try{
    const movies = await Movie.find({}).lean().exec();
    return res.status(201).send({movies});
    }
    catch(e){
      return  res.status(500).send({status:e.message})
    }
});

app.get("/movies/:id" , async (req, res) => {

    try{
    const movie = await Movie.findById(req.params.id).lean().exec();
    return res.send(movie);
    }
    catch(e){
        return  res.status(500).send({status:e.message})
    } 
       
});

app.patch("/movies/:id", async(req,res) => {

    // console.log(req.method)
     try{
         const movie = await Movie.findByIdAndUpdate(req.params.id,req.body, { new:true,} ).lean().exec();
          return res.send(movie);
         }
         catch(e){
             return  res.status(500).send({message:e.message,status:"Failed"})
         }
 });

 app.delete("/movies/:id", async (req,res) =>{

    try{
        const movie = await Movie.findByIdAndDelete(req.params.id ).lean().exec();
        return res.send(movie);

        }

        catch(e){
            return  res.status(500).send({message:e.message,status:"Failed"})
        }

});

app.listen(6677, async () =>{
    await connect()
    console.log("listening on port 6677")
})