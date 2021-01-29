// 1秒おきにカウントダウン
var cnt = 300;
// var id = setInterval(function(){
//     cnt--;
//     console.log(cnt);
//     let count_time = document.getElementById("count_time");
//     count_time.innerHTML = cnt;

//     // 現在日時と終了日時を比較
//     if(cnt ==0){
//         clearInterval(id);
//     }
// }, 1000);

document.getElementById("count_time").onclick = function(){
    console.log("画面クリックしたよ")
    var id = setInterval(function(){
        
        console.log(cnt);
        let count_time = document.getElementById("count_time");
        count_time.innerHTML = cnt;
        cnt--;
    
        // 現在日時と終了日時を比較
        if(cnt ==-1){
            clearInterval(id);
            document.getElementById("main_canvas").style.display = "none";
            balloon_number = pink_balloon_number+blue_balloon_number+green_balloon_number+yellow_balloon_number;
            console.log(balloon_number)
            if(balloon_number>9){
                document.getElementById("game_clear").style.display = "block";
            }else{
                document.getElementById("game_over").style.display = "block";

            }

        }
    }, 1000);
};