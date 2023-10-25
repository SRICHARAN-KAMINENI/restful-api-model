const express=require("express");
const bp=require("body-parser");
const ej=require("ejs");
const mongoose=require("mongoose");

const app=express();
app.use(bp.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static("public"));


mongoose.connect("mongodb://0.0.0.0:27017/wikidb",{useNewUrlParser:true});
const articleSchema={
    title: String,
    content: String
};

const Article=mongoose.model("Article",articleSchema);


/*****************article ***********************************************************/

app.route("/articles")
.get(function(req,res){
    Article.find().then(function(err,founddata){
        res.send(err);
    });
})

.post(function(req,res){
    const data=new Article({
        title:req.body.titl,
        content:req.body.conten
    });
    data.save().then(function(err){
        if(err){
            res.send("success");
        }
        else{
            res.send(err);
        }
    })

})
.delete(function(req,res){
    Article.deleteMany().then(function(){
            res.send("success");
    })
    .catch(function(error){
        console.log(error);
    });
});


/*****************article/selected route***********************************************************/


app.route("/articles/:name")

.get(function(req,res){
    Article.findOne({title:req.params.name}).then(function(val){
        res.send(val);
    })
    .catch(function(err){
        res.send(err);
    });
})
.put(function(req,res){
    Article.findOneAndUpdate({title: req.params.name},{title:req.body.title,content:req.body.content},{overwrite:true}).then(function(data){
        
            res.send(data);
    }).catch(function(err){
            console.log(err);
    });
        })
    
.patch(function(req,res){
    Article.findOneAndUpdate({title:req.params.name},{$set:req.body}).then(function(data){
        res.send("succ");
    }).catch(function(err){
        res.send(err);
    });
})

.delete(function(req,res){
    Article.deleteOne({title:req.params.name}).then(function(data){
        res.send("deleted");
    }).catch(function(err){
        res.send(err);
    });
});





/********************server port*******************/

app.listen(3000,function(){
    console.log("server running");
}); 



/*******************************Description**************************************/


// 1.tested using "postman windows application" for post,get and delete methods.
// 2.hosted on local server.
// 3.database used is mongodb.
// 4.external driver mongoose is used for Node.js.
// 5.studio 3t is used as gui for mongodb.
// 6.external modules(npm) used are express and body-parser.

