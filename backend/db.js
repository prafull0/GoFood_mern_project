const { Result } = require('express-validator');
const mongoose = require('mongoose');
const mongodbURI = "mongodb+srv://prafullpranpratap:prafull@cluster0.z2qljab.mongodb.net/gofoodmern"
const mongoDB = async ()=>{
  
 mongoose.connect(mongodbURI)


const itemsSchema = new mongoose.Schema({
    CategoryName:String,
    name:String,
    img:String,
    options:Array,
    description:String
})
const Schema = new mongoose.Schema({CategoryName:String})
const food_category = mongoose.model("food_category",Schema)
const food_items =  mongoose.model("food_item",itemsSchema)
global.fooditems = await food_items.find({})
global.foodcategory = await food_category.find({})
// console.log();


// global.food = [finditems]
// console.log(global.food);

// finditems.forEach((food) => {
//     console.log(food)
// });
// .then(async ()=>{
//             console.log("connected");
//     //         // console.log(result);
//  const fetched_data = await  mongoose.connection.db.collection("food_items");
//   console.log(fetched_data.find({}));
         
        // const data = [fetched_data.find({})]
        // console.log(data);
        // .then((result)=>{
        //     console.log(result);
            // result.toArray(function (err,data){
            //     if (err) {
            //      console.log(err);
            //     } else {
            //      console.log(data);
            //     }
            // }
            // ) 
        // })
        // .catch((err)=>{
        //     console.log(err);
        // })
        // .toArray(function (err,data){
        //     if (err) {
        //      console.log(err);
        //     } else {
        //      console.log(data);
        //     }
        // }
        // ) 

        
//      })
// .catch((err)=>{
//                 console.log(err);
//             })
}

    

module.exports = mongoDB;
