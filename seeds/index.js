const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

const mongoose = require('mongoose');
const campground = require('../models/campground');
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Mongo Connetion Open!!!')
    })
    .catch(err => {
        console.log('Oh no Mongo Error!!')
        console.log(err)
    });

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            author: '60f79eedfbbf6fee4f157726',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, magnam, magni debitis iusto minima veniam nisi autem provident molestias voluptate eos eveniet id odio dolorum? Ullam eligendi iste velit quod! Dolore veniam in eius quis repudiandae deleniti, est quasi id.Saepe labore, fugit error ad repellendus nemoperspiciatis numquam rem impedit laboriosam perferendis eligendi, ex debitis minima unde incidunt sint?',
            price,

            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ],
            },

            images:
                [
                    {
                        url: 'https://res.cloudinary.com/yudhochristin/image/upload/v1626936019/YelpCamp/j0e4d5paigeuvxshu0s5.jpg',
                        filename: 'YelpCamp/j0e4d5paigeuvxshu0s5'
                    },
                    {
                        url: 'https://res.cloudinary.com/yudhochristin/image/upload/v1626936019/YelpCamp/e1akprnyaqzvhc5obi17.jpg',
                        filename: 'YelpCamp/e1akprnyaqzvhc5obi17'
                    }
                ],

        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})

