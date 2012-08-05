var LastFocus = '#A1';
var Type ='easy';//used for puzzle type-difficulty
var interval; //used for timer
var puzzle; 

/*function setLastFocus() {
  var ae = document.activeElement;
  	console.log(ae.id);
	LastFocus = "#" + ae.id;
	console.log(LastFocus);
}*/

$("#typeMenu a").click(function(e){
  e.preventDefault();
  
  console.log($(e.target).text());
	Type = $(e.target).text();
    $('#wrapper').addClass('current').fadeIn();
    $('#typeMenu').fadeOut().removeClass('current');
    
    $.getJSON("data/boards.json", function(data){
    // Got JSON, now template it!
    //console.log("Type: " + Type +  " Data: " + data[Type][0].initValues);
 debug = data;
    var puzzleID = Math.floor(Math.random()*data[Type].length);
	puzzle = data[Type][puzzleID];
	initValues = puzzle.initValues;
	//console.log(data[Type].length);
	var cnt =0;
	for(var row = 0; row <= 8; row++){
		for(var col=0; col <=8 ; col++){
			var value = initValues.substr(cnt,1);
			if(value > 0 && value <10){
			  $("#" + row + col).val(value);
			  //console.log("Row: " + row + ", Column: " + col + ", Value: " + initValues.substr(cnt,1));
			 // $("#" + row + col).attr('disabled','disabled');
			}
			cnt++;
		}
	}
  });
    		startTimer(new Date(12,12,12,0,0,0,0)); //just for init
});

function preventFocus() {
  LastFocus = "#" + document.activeElement.id;
//   setTimeout(function() { ae.focus() }, 1);
//  document.activeElement.focus();
  console.log(document.activeElement.id);
}

function addSelect() {
	$AllInputs = $('input');
	ae = $(document.activeElement);
	//console.log("select:" + ae);
	//$AllInputs.removeClass('selected');
	//$SelectedInput = $AllInputs.filter(ae);
	//$SelectedInput.addClass('selected');
	var row, col, box;
	row = ae.attr("id").slice(0,1);
	col = ae.attr("id").slice(-1);
	Box = ae.parent().attr("id");
	
	$Relevant = $('[id^="' + row + '"],[id$="' + col + '"],div.#' + Box + ' input');	
	
	ae.addClass('selected');
	$Relevant.addClass('relevant');
}

function removeSelected() {
	$AllInputs = $('input');
	ae = $(document.activeElement);
	console.log("remove:" + ae);
	$AllInputs.removeClass('selected relevant');
	//$SelectedInput = $AllInputs.filter(ae);
	//$SelectedInput.addClass('selected');	
	//ae.addClass('selected');
}

function changeValue(value){

	noteIndex = value-1;
	//alert("set cell to: " + value);
	$ae = $(document.activeElement);

	if(!$('#Note').hasClass('notes')){	
		//console.log("if");
		$ae.val(value);
	}else if(value != ''){
		//console.log("if else note before" + $notes[noteIndex]);
		$notes = $ae.attr("placeholder");
		if($notes[noteIndex] == " "){
			var strNote = $notes.slice(0,noteIndex) + value + $notes.slice(value,9);
		} else {
			var strNote = $notes.slice(0,noteIndex) + " " + $notes.slice(value,9);
		}	
		//console.log("if else note after" + $notes[value-1]);
		$ae.attr("placeholder", strNote);	
	}else {
		//console.log("else");
		$ae.attr("placeholder","         ");
	}
} 

function focus() {
	console.log(LastFocus);
    $(LastFocus).focus();
    //$(LastFocus).addClass('selected');
}
function getBoardState(){
	/*$("input").each(function(){
		if(!isNaN(this.value))
			CellValues.push(this.value);
	});*/
}
function resetBoard(){
	//$("input:enabled").val("");
	//
}
function check(){
	// need to fix do that solution is array; not string 
	var temp = puzzle.solution;
	var solution = temp.split("");
	//var solution = ["9", "1", "2", "7", "6", "5", "1", "9", "6", "2", "8", "4", "3", "1", "5", "7", "6", "9", "7", "1", "8", "9", "4", "6", "1", "1", "2", "6", "9"];
	//var current_vals = [];
	//$("input:enabled").each(function(){
  //	current_vals.push($(this).val());
  //});
	var status=true;
	//for(i=0; i<solution.length; i++){
	i=0;
	for(var row = 0; row <= 8; row++){
		for(var col = 0; col <= 8; col++){
			//if(solution[i]==current_vals[i]){
			if(solution[i]==$("#" + row + col).val()){	
				status=true;
				i++;
			}
			else{
				status=false;
				i++;
				break;
			}
		}
	}
	if(status){
		alert("Solved");
		// also need to stop timer if correct
	}
	else {alert("Incorrect");}
}
function startTimer(time){
	//var prev_time=time;
	var h=time.getHours(), m=time.getMinutes(), s=time.getSeconds();
	//var h=0, m=0, s=0;
	interval = setInterval(function(){
		//var value = parseInt($('#Clock').text(), 10);
    //value++;
		if(s > 59){ s = 0; m++;}
		if(m > 59){ m = 0; h++;}
	  $('#Clock').text(checkFormat(h)+":"+checkFormat(m)+":"+checkFormat(s));
		s++;
	},1000); //update clock every second
}
function restartTimer(time){
	var totSec=time/1000;
	var h=Math.floor(totSec/3600), m=Math.floor((totSec-(h*3600))/60), s=totSec%60;
	//var h=0, m=0, s=0;
	interval = setInterval(function(){
		//var value = parseInt($('#Clock').text(), 10);
    //value++;
		if(s > 59){ s = 0; m++;}
		if(m > 59){ m = 0; h++;}
	  $('#Clock').text(checkFormat(h)+":"+checkFormat(m)+":"+checkFormat(s));
		s++;
	},1000); //update clock every second
}
function checkFormat(i){
	// adds extra zero to keep 2 digit look and feel in timer
	if (i<10){i="0" + i;}
	return i;
}
$(focus);
$(function() {
    $(document.body).load(focus);
    $('#button1').mouseup(focus);
	$('#button2').mouseup(focus);
    $('#button3').mouseup(focus);
    $('#button4').mouseup(focus);
    $('#button5').mouseup(focus);
    $('#button6').mouseup(focus);
    $('#button7').mouseup(focus);
    $('#button8').mouseup(focus);
    $('#button9').mouseup(focus);
    $('#Pause').mouseup(focus);
    $('#Notes').mouseup(focus);
    $('#Clear').mouseup(focus);    
		$("#Options").click(check);
		// might need to change event handle for this
		// when board first gets clicked timer starts
		/*$("body").one("click", function() {
  		startTimer(new Date(12,12,12,0,0,0,0)); //just for init
		});*/
});
$(function(){	
	//-----------------------------------------------------------------------
	//monitor accelerometer for shake events
	//----------------------------------------------------------------------
	var lastX, lastY, lastZ, lastShake = new Date().getTime(), threshold = 10;
  $(window).bind("devicemotion", function(e){
    var motionEvent = e.originalEvent,
				accel = motionEvent.accelerationIncludingGravity,
        x = accel.x,
        y = accel.y,
        z =  accel.z;
    $("#x").html("x:" + x);
    $("#y").html("y:" + y);
    $("#z").html("z:" + z);
    
    if(lastX !== null && lastY !== null &&  lastZ !== null) {
      var diffX = Math.abs(x - lastX),
          diffY = Math.abs(y - lastY),
          diffZ = Math.abs(z - lastZ);   
      if (diffX > threshold && diffY > threshold |diffX > threshold && diffZ > threshold || diffY > threshold && diffZ > threshold) {
        var now = new Date().getTime(),
            diffTime = now - lastShake;
        if (diffTime > 500) {
          //confirm("Reset the Board?");
					//var r=confirm("Press a button!");
					if(confirm("Reset the current Board?")){
  					resetBoard();
  				}
          //$("#status").html("Skaken!");
          lastShake = now;
        }
      }
    }
    lastX = x;
    lastY = y;
    lastZ = z;
  });
});

$(document).ready(function(){

});

function pause() {
	//need to save current time in #Clock div (saving time in milliseconds)
	var re=/^(?:(?:(\d+):)?(\d+):)?(\d+)$/,
      time=$("#Clock").html(),
      aMatch=re.exec(time),
      seconds=(3600*aMatch[1]|0)+(60*aMatch[2]|0)+(aMatch[3]|0);
			milliseconds=1000*seconds;

	$("#paused").toggle();	
	//would need to stop timer when implemented
	if($('#paused').is(":visible")){
	//this stops timer
	console.log("True");
	clearInterval(interval);
	} else {
	//need to figure out how to resume timer
		console.log("False");
		restartTimer(milliseconds);
	}
}

function toggleNotes() {
	if($('#Note').hasClass('notes')){
		$('#Note').removeClass('notes');
	}else {
		$('#Note').addClass('notes');
	}	
}
