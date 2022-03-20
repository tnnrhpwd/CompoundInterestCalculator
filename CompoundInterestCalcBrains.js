// assign variables for HTML outputs
let title= document.getElementById("title");
let description= document.getElementById("description");
let inputs= document.getElementById("inputs");
let button= document.getElementById("button");
let output= document.getElementById("output");
// Initalize strings used for input collection and output
var inputString;
var outputString="";
var tense = "";

Initialize() // call the main method that contains the webpage text

function Initialize(){ // the main method that contains the webpage text
    title.innerHTML += `<div id="title">`+"Online Financial Annuity Calculator"
    +`</div>`; // add the title text

    description.innerHTML +=`<div id="description">`+"Take advantage of this calculator to simulate compound interest over time and convert annuities between forms!"
    +`<br><br>`+ "P=Present, F=Future, A=Annual, and G=Gradient"+`<br><br>`
    +"Simply enter the type of calculation you want: PtoF, AtoF, FtoP, AtoP, GtoP, FtoA, PtoA, or GtoA.<br> Next, enter the <b>$amount</b>. <br>Then, enter the desired <b>number of periods</b>. <br>Lastly, enter the <b>interest rate</b>. <br><br> Example: If you wanted to calculate the future value at 15% annualized interest over 10yrs. from a present value of $10,000, then the input would be: <br><br> ptof 10000 10 .15"
    +`</div>`; // add the description text

    inputs.innerHTML +=`<input type="text" id="inputTEXT"/>`; // add the textbox
    inputs.innerHTML +=`<button id="button" onclick="Calculate()" >Run</button>`; // add the run button
}

function Calculate(){          // EVERY BUTTON PRESS - outputs the answer based on the data in the textbox
    // create a variable of the input field
    inputString =document.getElementById("inputTEXT").value;
    // parse data string apart
    var words=inputString.split(' ');
    let fromFrom = words[0];
    let fromAmount = words[1];
    let fromPeriods = words[2];
    let fromRate = words[3];
    outputString= Calculations(fromFrom,fromAmount,fromPeriods,fromRate);  // calculates the value
    output.innerHTML= `<div id="output">`+"The "+tense+" value is $"+outputString+"."
    +`</div>`;    //outputs the answer
};

function Calculations(toFrom, toAmount, toPeriods, toRate){ // called from Calculate() - does math based on inputs
   var type = toFrom.toUpperCase(); // what formula to use
   var amount = toAmount;           // amount of resources or currency
   var n = toPeriods;               // number of periods that interest is applied
   var i = toRate;                  // interest rate or discount rate
   var ansr = 0;                    // output
   tense = "";                      // what time tense to use -- future, present, or past

   // all of these formulas were manually entered from my Engineering economy textbook - (Engineering Economy - Sullivan, Wicks, Koelling (2015))
    if(type==("PTOF")) // This method finds the future worth from the present worth
    {
       tense = "future";
       ansr = (amount * (Math.pow(1+i,n))).toFixed(2);
    }
    else if(type==("ATOF")) // This method finds the future worth from the annual worth
    {
        tense = "future";
        ansr = (amount * (((Math.pow((1+i),n))-1)/i)).toFixed(2);
    }
    else if(type==("FTOP")) // This method finds the present worth from the future worth
    {
        tense = "present";
        ansr = (amount * (Math.pow(1/(1+i),n))).toFixed(2);
    }
    else if(type==("ATOP")) // This method finds the present worth from the annual worth
    {
        tense = "present";
        ansr = (amount * (((Math.pow((1+i),n))-1)/(i*(Math.pow((1+i),n))))).toFixed(2);
    }
    else if(type==("GTOP")) // This method finds the present worth from the gradient worth
    {
        tense = "present";
        var innerL = ((Math.pow((1+i),n)-1)/(i*(Math.pow((1+i),n))));
        var innerR = n/(Math.pow((1+i),n));
        ansr = (amount * (1/i)*(innerL - innerR)).toFixed(2);
    }
    else if(type==("FTOA")) // This method finds the annual worth from the future worth
    {
        tense = "annual";
        ansr = (amount * ((i)/(Math.pow((1+i),n)-1))).toFixed(2);
    }
    else if(type==("PTOA")) // This method finds the annual worth from the present worth
    {
        tense = "annual";
        var upper = i*(Math.pow((1+i),n));
        var lower = (Math.pow((1+i),n)-1);
        ansr = (upper/lower).toFixed(2);
    }
    else if(type==("GTOA")) // This method finds the annual worth from the gradient worth
    {
        tense = "annual";
        ansr = (amount * ((1/i)-(n/(Math.pow((1+i),n)-1)))).toFixed(2);
    }
    else {ansr="Please reread the directions."; } // if bad input
    return ansr // return the answer
}


