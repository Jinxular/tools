setInterval(function() {
    if(check_inputs() == false){
        document.getElementById('parse').disabled = true;
    }else{
        document.getElementById('parse').disabled = false;
    }
},50);

function check_inputs(){
    let inputs = [
        document.getElementById("q_col").value == '',
        document.getElementById("q_name").value == '',
        document.getElementById("data_start").value == '',
        document.getElementById("q_time").value == '',
        document.getElementById("input").value == ''
    ];
    for(let i = 0; i < inputs.length; i++){
        if(inputs[i] == true){
            return false;
        }
    }
    return true;
}


var csvarray;
var usittstr = "";

//user inputs
var starting_row;
var q_time;
var q_num_col;
var q_name_col;


function parse_csv (inputarr){
    if(!Array.isArray(inputarr)){
        console.log("input not an array");
        return;
    }else if(!Array.isArray(inputarr[0])){
        console.log("input only 1d array");
        return;
    }else if(Array.isArray(inputarr[0][0])){
        console.log("input > 2d array");
        return;
    }
    starting_row = document.getElementById("data_start").value;
    q_time = document.getElementById("q_time").value;
    q_num_col = document.getElementById("q_col").value;
    q_name_col = document.getElementById("q_name").value;

    usittstr += "Ident 3:0\n\n\n";
    usittstr += "!========= Start Data ==========\n\n\n\n\n";


    for(let i = starting_row - 1; i < inputarr.length; i++){
        usittstr += "CUE ";
        usittstr += inputarr[i][q_num_col-1];
        usittstr += "\n";
        usittstr += "Text "
        usittstr += inputarr[i][q_name_col-1];
        usittstr += "\n";
        usittstr += "Up ";
        usittstr += q_time;
        usittstr += "\n\n\n";
        // usittstr += "!===============================\n";
    }
    usittstr += "EndData";
    createblob(usittstr);
}



function readfile(){
    usittstr = "";
    
    const file = document.getElementById("input").files[0];
    if (!file) {
        console.log("No file selected. Please choose a file.", "error");
        return;
    }

  // Read the file
    let reader = new FileReader();
	reader.onload = function () {
		csvarray = $.csv.toArrays(reader.result);
        parse_csv(csvarray);
	}
    reader.readAsText(file);
}


function createblob(textcontent){
    const blob = new Blob([textcontent], { type: 'text/plain;charset=utf-8' });
    const blobUrl = URL.createObjectURL(blob);
    const downloadLink = document.getElementById('download');
    downloadLink.href = blobUrl;
    downloadLink.download = 'USITT_ASCII.txt';
    downloadLink.style.display = 'flex';
}