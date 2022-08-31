//pulls any previously saved data from local storage
    function grabLocalData(key){
    let data = localStorage.getItem(key);
    if(data){
        $(`#text${key}`).text(value);
    }
}
//adds in the input divs for the work day hours
$(document).ready(function(){
    $('#currentDay').text(moment().format("dddd, MMMMM Do, YYYY"));
    for(let i = 9; i < 18; i++) {
       
        var timeLine = $(`<div data-time=${i} id='${i}' class="row">`);

        var firstCol = $('<div class="col-sm-2"> <p class="hour"> ' + dayTimeAmPm(i) + '</p>');

        var secondCol = $(`<div class="col-sm-8 past"> <textarea id=text${i} class="description" placeholder="Add whats going on"></textarea>`);

        var thirdCol = $(`<div class="col-sm-2"><button class="saveBtn" id=${i}><i class="fas fa-save"></i></button>`)

        timeLine.append(firstCol);
        timeLine.append(secondCol);
        timeLine.append(thirdCol);
        $(".container").append(timeLine);

        grabLocalData(i);
    }
//creates the day and night cycle
    function dayTimeAmPm(hours){
        var ampm = hours >= 12 ? 'PM' : 'AM';
       hours = hours % 12;
       hours = hours ? hours : 12;
       return hours + ampm;
     }
   dayTimeAmPm();
//changes the color when the time his in future current or past
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
   }, 1000);
//makes the save btn event save data to the local storage 
   var saveBtn = $('.saveBtn');
   saveBtn.on('click', function(){
    let btnClicked = $(this).attr('id');
    let savedText = $(this).parent().siblings().children('.description').val();
    localStorage.setItem(btnClicked, savedText);
   });
});