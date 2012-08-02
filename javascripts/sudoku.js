var LastFocus = '#A1';
var interval; //used for timer

/*function setLastFocus() {
  var ae = document.activeElement;
  	console.log(ae.id);
	LastFocus = "#" + ae.id;
	console.log(LastFocus);
}*/

function preventFocus() {
  LastFocus = "#" + document.activeElement.id;
//   setTimeout(function() { ae.focus() }, 1);
//  document.activeElement.focus();
  console.log(document.activeElement.id);
}

function addSelect() {
	$AllInputs = $('input');
	ae = $(document.activeElement);
	console.log("select:" + ae);
	//$AllInputs.removeClass('selected');
	//$SelectedInput = $AllInputs.filter(ae);
	//$SelectedInput.addClass('selected');	
	ae.addClass('selected');
}

function removeSelected() {
	$AllInputs = $('input');
	ae = $(document.activeElement);
	console.log("remove:" + ae);
	$AllInputs.removeClass('selected');
	//$SelectedInput = $AllInputs.filter(ae);
	//$SelectedInput.addClass('selected');	
	//ae.addClass('selected');
}

function changeValue(value){
	//alert("set cell to: " + value);
	$ae = $(document.activeElement);
	$ae.val(value);

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
	$("input:enabled").val("");
}
function check(){
	// need to fix this function to work with JSON!!!
	var solution = ["9", "1", "2", "7", "6", "5", "1", "9", "6", "2", "8", "4", "3", "1", "5", "7", "6", "9", "7", "1", "8", "9", "4", "6", "1", "1", "2", "6", "9"];
	var current_vals = [];
	$("input:enabled").each(function(){
  	current_vals.push($(this).val());
  });
	var status=true;
	i=0;
	for(i=0; i<solution.length; i++){
		if(solution[i]==current_vals[i]){
			status=true;
		}
		else{
			status=false;
			break;
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
		// just for testing for now
		$("#Options").click(check);
		// might need to change event handle for this
		// when board first gets clicked timer starts
		$("body").one("click", function() {
  		startTimer(new Date(12,12,12,0,0,0,0)); //just for init
		});
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
	
	$.getJSON("data/boards.json", function(data){
    // Got JSON, now template it!
    var puzzleID = Math.floor(Math.random()*1);
		var puzzle = data[puzzleID].initValues;
	
		var cnt =0;
		for(var BoxCode = 65; BoxCode <= 74; BoxCode++){
			var Box = String.fromCharCode(BoxCode);
			console.log(Box);
			for(var pos=1; pos <=9 ; pos++){
				var value = puzzle.substr(cnt,1);
				if(value > 0 && value <10){
			  	$("#" + Box + pos).val(value);
			  	console.log("Box: " + Box + ", Pos: " + pos + ", Value: " + puzzle.substr(cnt,1));
			  	$("#" + Box + pos).attr('disabled','disabled');
				}
				cnt++;
			}
		}
  });
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
	
	//this stops timer
	clearInterval(interval);
	//need to figure out how to resume timer
}
