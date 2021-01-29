AWS.config.region = 'ap-northeast-1'; // リージョン
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "ap-northeast-1:a47ce603-3f8d-4a17-9696-f4ff16f46221",
});

AWS.config.credentials.get()

var dynamodb = new AWS.DynamoDB.DocumentClient();

let light_sensor_value = 0;
let temperature_value = 0;
let pressure_value = 4092;
let ax_value = 0;

//const div_values = [light_div, pressure_div, temperature_div, ax_div];

// username_elem = document.getElementById("username");
// light_elem = document.getElementById("light");
// temperature_elem = document.getElementById("temperature");
// pressure_elem = document.getElementById("pressure");
// ax_elem = document.getElementById("ax");
// ay_elem = document.getElementById("ay");
// az_elem = document.getElementById("az");
// air_pres_elem = document.getElementById("air_pres");

let sum_values = [0, 0, 0, 0, 0, 0, 0];
const sensor_values = ['light', 'pressure', 'temperature', 'ax', 'ay', 'az', 'air_pres'];

var rAF = window.mozRequestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.requestAnimationFrame; 

// 何かデータをDBに入れたい時にはここ使おう
// var params = {
//     TableName: 'mechatronics_from_arduino',
//     Key:{
//         'username': 'kamiya'
//     },
//     ExpressionAttributeNames: {
//         '#l': 'light'
//     },
//     ExpressionAttributeValues:{
//         ':light': 200
//     },
//     UpdateExpression: 'SET #l = :light'
// };

// dynamodb.update(params, function(err, data) {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log("way to go!")
//     }
// });

const get_sum = async(str, j) =>{
    var params = {
        TableName: 'mechatronics_from_arduino',
        ProjectionExpression: str
    };

    await dynamodb.scan(params, function(err, data){
        if(err){
            console.log(err);
        }else{
            i=0
            data.Items.forEach(function(num, index){
                //console.log(num[str]);
                sum_values[j] += parseInt(num[str]);
                i++;
            });
        }
    });
}

const update = async() => {
    for(i=0; i<4; i++){
        await get_sum(sensor_values[i], i);
        switch(i){
            case 0:
                light_sensor_value = sum_values[0]/10;
                break;
            case 1:
                if(sum_values[1]!=0){
                    pressure_value = (4092 - sum_values[1])/18;
                }
                break;
            case 2:
                if(sum_values[2]!=0){
                    temperature_value = sum_values[2]*2;
                }
                break;
            case 3:
                    ax_value = sum_values[3]*3 + 108;
                break;
        }
    }

    // light_elem.innerHTML = sum_values[0]
    // temperature_elem.innerHTML = sum_values[1]
    // pressure_elem.innerHTML = sum_values[2]
    // ax_elem.innerHTML = sum_values[3]
    // ay_elem.innerHTML = sum_values[4]
    // az_elem.innerHTML = sum_values[5]
    // air_pres_elem.innerHTML = sum_values[6]
    console.log(sum_values);
    sum_values = [0, 0, 0, 0, 0, 0, 0, 0];


    // dynamodb.scan(params, function(err, data){
    //     if(err){
    //         console.log(err);
    //     }else{
    //         i=0
    //         data.Items.forEach(function(num, index){
    //             console.log(num);
    //             console.log(num[str]);
    //             console.log(i)
    //             if(i === 2){
    //                 light_elem.innerHTML=num[str];
    //             }
    //             i++;
    //         });
    //     }
    // });

}

//Start
setInterval(update, 1000);