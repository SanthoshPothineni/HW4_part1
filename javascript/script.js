$(document).ready(function(){
  $('#multForm').on('blur keyup', function () {
    if ($('#multForm').validate().checkForm()) {
          $('#submit').prop('disabled', false); // enables submit button 
    }
    else {
          $('#submit').prop('disabled', true); // disables submit button
    }
});
  //Validation rules for form
  jQuery.validator.addClassRules('numbox', {
    required: true,
    isInt: true,
    inRange: true
  });

    $("#multForm").validate();
    $('#submit').click(processing);
    addSliders();
});

//Extra validator method to confirm number is an int
jQuery.validator.addMethod("isInt", function(value, element) {
  return this.optional(element) || (Number.isInteger(parseFloat(value)));
}, "Entered a non integer value, please enter integers only.");

//Extra validator method to confirm number is in range
jQuery.validator.addMethod("inRange", function(value, element) {
  return this.optional(element) || (-50 <= value)&& (value <= 50);
}, "Please enter an integer between -50 and 50");

function processing() {


    //form input values.
    let startRow = document.getElementById("Hstart").value;
    let startCol = document.getElementById("Vstart").value;
    let endRow = document.getElementById("Hend").value;
    let endCol = document.getElementById("Vend").value;

    //Get table via ID
    let table = document.getElementById("myTable");
    table.innerHTML = "";
    var tbody = document.createElement('tbody');
  
    var headerRow = document.createElement('tr');
    headerRow.appendChild(document.createElement('th')); // empty corner cell

    
    //Error checking for end of row/col being smaller then start
    if(parseInt(startRow) > parseInt(endRow)){
      let i = startRow;
      startRow = endRow;
      endRow = i;
    }

    if(parseInt(startCol) > parseInt(endCol)){
      let j = startCol;
      startCol = endCol;
      endCol = j;
    }


  // Loops for filling tqable with appropriate multiplied numbers.
    for (var col = parseInt(startCol); col <= parseInt(endCol); col++) {
      var th = document.createElement('th');
      th.textContent = col;
      headerRow.appendChild(th);
    }
    tbody.appendChild(headerRow);

    for (var row = parseInt(startRow); row <= parseInt(endRow); row++) {
      var tr = document.createElement('tr');
      var thRow = document.createElement('th');
      thRow.textContent = row;
      tr.appendChild(thRow);

      for (var col = parseInt(startCol); col <= parseInt(endCol); col++) {
        var td = document.createElement('td');
        td.textContent = row * col;
        tr.appendChild(td);
      }

      tbody.appendChild(tr);
    }

    table.appendChild(tbody);
    return false;
};