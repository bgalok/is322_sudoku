var LastFocus = '#A1';

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
	if(status) {alert("Solved");}
	else {alert("Incorrect");}
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
		$("#Options").click(check);
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