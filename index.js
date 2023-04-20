const mongoose = require('mongoose');
mongoose.set('strictQuery', false)

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const addRecipe = {
  title: 'Swedish meatballs',
  level: 'Amateur Chef',
  ingredients: ['Minced_Beef', 'Onion', 'Breadcumbs', 'Egg'],
  cuisine: 'Swedish',
  dishType: 'Main_Course',
  duration: 30,
  creator: 'Robine',
}

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })  
  //iteration 2
  
.then(() => {
  return Recipe.create(addRecipe);
  })

  //iteration 3
 .then(() => {
  return Recipe.insertMany(data)
 })

 .then(()=> {
  const filter = [{title: "Rigatoni alla Genovese"}]
  const update = {duration:100}
  return Recipe.findByIdAndUpdate(filter, update)
 })

 .then(() => {
  console.log("Updated")
 })

 .catch(error => {
  console.error('Error connecting to the database', error);
});
