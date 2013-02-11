var my_variable = null;

function my_function(argument_01){
  // do something
  return true;
}

function Car(make, maxTankSizeInGallons){

  // instance attributes
  this.color = null;
  this.interior = null; // leather, suede
  this.model = null;
  this.make = make;
  this.maxTankSizeInGallons = maxTankSizeInGallons;
  this.gallonsInTank = maxTankSizeInGallons;

  // instance methods

  // show fuel level as a percentage of gas tank filled
  this.fuelLevel = function(){
    var percentageLeftInTank = 1.0;

    if(this.gallonsInTank > 0.0){
      percentageLeftInTank = (this.gallonsInTank / this.maxTankSizeInGallons);
    } else {
      percentageLeftInTank = 0.0;
    }

    return (percentageLeftInTank * 100) + "% left";
  }

  // indicate that some fuel was used
  // gallonsUsed: integer representing the number of gallons used
  this.useFuel = function(gallonsUsed){
    if(this.gallonsInTank > 0.0){

      if(gallonsUsed <= this.gallonsInTank){
        this.gallonsInTank -= gallonsUsed;

      } else {
        alert("Oops!  You don't have that much gas.");
      }

    } else {
      alert("Sorry, bud; no gas!  Go fill up.");
    }
  }
}

var volvo = new Car("Volvo", 15);
var honda = new Car("Honda", 10);
var chevy = new Car("Chevrolet", 25);

var fuelLeftForVolvo = volvo.fuelLevel();
[fuelLeftForVolvo, volvo.gallonsInTank + " gallons left"].join(", ");

volvo.useFuel(2);
[fuelLeftForVolvo, volvo.gallonsInTank + " gallons left"].join(", ");
