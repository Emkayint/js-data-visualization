// JSC.Chart("mychart", {
//     type: 'column',
//     series: [
//         {   name: "Andy",
//             points: [
//                 {
//                     x: "Apples", y:50
//                 },
//                 {
//                     x: 'Oranges', y: 42
//                 },
//                 {
//                     x: "Maize", y: 74
//                 }
//             ]
//         },

//         {
//             name: "Cindy",
//             points: [
//                 {
//                     x: "Apples", y: 35
//                 },
//                 {
//                     x: "Oranges", y: 67
//                 },
//                 {
//                     x: "Maize", y: 50
//                 }
//             ]
//         }
//     ]
// });

fetch('https://data.cdc.gov/resource/w9j2-ggv5.csv')
    .then(function(response){
        return response.text();
    })
    .then(function(text){
        let series = csvToSeries(text);
        renderChart(series);
    })
    .catch(function(error){
        console.log(error);
    });

function csvToSeries(text){
    const lifeExp = 'average_life_expectancy';
    let dataAsJson = JSC.csv2Json(text);
    let male = [], female = [];
    dataAsJson.forEach(function(row){
        if ( row.race === "All Races" ){
            if(row.sex === "Male"){
                male.push({x: row.year, y: row[lifeExp]});
            } else if (row.sex === "Female"){
                female.push({x: row.year, y: row[lifeExp]});
            }
        }
    });
    return [
        {name: 'Male', points: male},
        {name: 'Female', points: female}
    ]
}


function renderChart(series){
    JSC.Chart("mychart", {
        series: series
    })
}