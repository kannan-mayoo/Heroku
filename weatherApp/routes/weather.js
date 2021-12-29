// const router = require('express').Router();

// const fetch = require('node-fetch');


// require('dotenv').config();



// router.get('/', (req, res) => {
//     res.render('index', {
//         city: null,
//         des: null,
//         temp: null,
//         icon: null
//     });
// });

// router.post('/', async(req, res) => {
//     const city = req.body.city;
//     // const apiKey = process.env.API_KEY;
//     const url_api = `https://api.openweathermap.org/data/2.5/
//     weather?q=${city}&appid=${process.env.API_KEY}`;
//     // console.log(city);
//     // console.log(apiKey);
//     // console.log(url_api);


//     try {
//         await fetch(url_api)
//             .then(res => res.json())
//             .then(data => {
//                 if (data.message === "city not found") {
//                     res.render('index', {
//                         city: data.message,
//                         des: null,
//                         temp: null,
//                         icon: null
//                     })
//                 } else {
//                     const city = data.name;
//                     const des = data.weather[0].description;
//                     const icon = data.weather[0].icon;
//                     const temp = data.main.temp;
//                     res.render('index', {
//                         city,
//                         des,
//                         icon,
//                         temp
//                     });
//                 }
//             });
//     } catch (err) {
//         res.render('index', {
//             city: 'something went wrong',
//             des: null,
//             icon: null,
//             temp: null
//         })

//     }




//     // .catch((e) => {
//     //     console.log("Failed to fetch page: ", err);

//     // });


// });


// module.exports = router;







const router = require('express').Router();
const fetch = require('node-fetch');
const math = require('mathjs');

require('dotenv').config()

router.get('/', (req, res) => {
    res.render('index', {
        city: null,
        des: null,
        icon: null,
        temp: null
    });
});

router.post('/', async(req, res) => {
    const city = req.body.city;
    const url_api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;

    try {
        await fetch(url_api)
            .then(res => res.json())
            .then(data => {
                if (data.message === 'city not found') {
                    res.render('index', {
                        city: data.message,
                        des: null,
                        icon: null,
                        temp: null
                    })
                } else {
                    const city = data.name;
                    const des = data.weather[0].description;
                    const icon = data.weather[0].icon;
                    const temper = data.main.temp;


                    const tempInCelsius = math.floor(temper);

                    res.render('index', {
                        city: city,
                        des: des,
                        icon: icon,
                        temp: tempInCelsius
                    });
                }
            });

    } catch (err) {
        res.render('index', {
            city: 'something wrong',
            des: null,
            icon: null,
            temp: null
        })
    }

})


module.exports = router;