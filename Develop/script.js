function grabLocalData(key){
    let data = localStorage.getItem(key);
    if(data){
        $(`#text${key}`).text(value);
    }
}

$(document).ready(function(){
    $('#currentDay').text(moment().format("dddd, MMMMM Do, YYYY"));
    for(let i = 9; i < 18; i++) {
       
        var timeLine = $(`<div data-time=${i} id='${i}' class="row">`);

        var firstCol = $('<div class="col-1"> <p class="hour"> ' + dayTimeAmPm(i) + '</p>');

        var secondCol = $(`<div class="col-2"> <textarea id=text${i} class="inputArea" placeholder="Add whats going on"></textarea>`);

        var thirdCol = $(`<div class="col-3"><button class="saveBtn" id=${i}></button>`);

        timeLine.append(firstCol);
        timeLine.append(secondCol);
        timeLine.append(thirdCol);
        $(".container").append(timeLine);

        //localstorage
    }

    function dayTimeAmPm(hours){
        var ampm = hours >= 12 ? 'Am' : 'Pm';
       hours = hours % 12;
       hours = hours ? hours : 12;
       return hours + ampm;
     }
   dayTimeAmPm();

   function colorChange() {
    var nowTime = new Date().getHours();
    for(var i = 9; i < 18; i++) {
        if($(`#${i}`).data("time") == nowTime){
            $(`#text${i}`).addClass("present");
        }else if(nowTime < $(`#${i}`).data("time")) {
            $(`#text${i}`).addClass("future")
        }
      }
   }

   setInterval(function() {
    colorChange();
   }, 1000)
});