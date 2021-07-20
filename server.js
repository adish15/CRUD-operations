
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const express=require('express');
const app= express();
app.use(express.json());


mongoose.connect('Please enter your mongoDb URI', { useNewUrlParser: true }, { useUnifiedTopology: true });

const makeSchema=mongoose.Schema({

    year: { type: Number, required: true },
    make: { type: String, required: true },
    model: { type: String, required: true }
    
})

const makeModel=mongoose.model('Make', makeSchema);

app.post('/create', async(req,res)=>{
    let make= new makeModel({
        
        year:req.body.year,
        make:req.body.make,
        model:req.body.model
    })

    await make.save();

    res.send(make);
})

app.post('/delete/:id', async(req,res)=>{
    let make= await makeModel.deleteOne({_id:mongoose.Types.ObjectId(req.params.id)});

    res.send("entry deleted");
})

app.get('/read', async(req,res)=>{
    let entries= await makeModel.find({});

    res.send(entries);
})

app.post('/update/:id', async(req,res)=>{

    let entry =await makeModel.findOne({_id:mongoose.Types.ObjectId(req.params.id)});
    Object.assign(entry,req.body);
    await entry.save();

    res.send(entry);
})


app.get('/', (req,res)=>{
    res.send("working");
})

app.listen(3001, console.log("server running"));
