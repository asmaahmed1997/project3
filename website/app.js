/* Global Variables */
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let key = 'e379ee697aa9206a0ad08c2f4dd98150';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
//console.log(newDate);

const performAction = async function () {
    const postCode = document.getElementById('zip').value
    const feelings = document.getElementById('feelings').value
    const url = `${baseURL}${postCode}&APPID=${key}`

    let data = await getWeather(url)
    let temp = data.main.temp


    const allData = {
        date: newDate,
        temp: temp,
        feelings: feelings,
    }
    //console.log(allData)
    postData('http://localhost:8000/addWeatherData', allData)
    updateUI()

}

const button = document.querySelector('#generate')
button.addEventListener('click', performAction)

const getWeather = async (URL) => {
    let res = await fetch(URL)
    //console.log(res);
    try {
        let data = await res.json();
       // console.log(data);
        //console.log("test1");
        return data;
    }
    catch(error) {
        console.log("error", error);
    }
}

const postData = async (url = '', data = {}) => {
    const Request = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await Request.json();
       // console.log(newData)
       // console.log("test2");
        return newData;
    }
    catch (error) {
        console.log('Error', error);
    }
}



// Update user interface
const updateUI = async () => {
    const date = document.getElementById('date')
    const temp = document.getElementById('temp')
    const feelings = document.getElementById('content')
    const request = await fetch('http://localhost:8000/all');
    const Data = await request.json();
    //console.log(Data);
    date.innerHTML = Data.date;
    temp.innerHTML = Data.temp;
    feelings.innerHTML = Data.feelings;
}