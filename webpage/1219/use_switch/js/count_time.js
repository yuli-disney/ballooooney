// 1秒おきにカウントダウン
var cnt = 120;
var id = setInterval(function(){
    cnt--;
    console.log(cnt);
    let count_time = document.getElementById("count_time");
    count_time.innerHTML = cnt;

    // 現在日時と終了日時を比較
    if(cnt ==0){
        clearInterval(id);
    }
}, 1000);