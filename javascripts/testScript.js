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
});