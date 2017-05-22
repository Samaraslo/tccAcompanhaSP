var convertNumberToMoney = (function(value) {
 
  return {
    func1: function(value) {
      alert(value) ;
      var num = value.toFixed(2);
      num = num.replace(".",",");
      num = 'R$' + num.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
      alert(num) ;
    }
  }
 
})(convertNumberToMoney||{})
 
 
var webGlObject = (function() {
  return {
    init: function() {
    }
  }
})(webGlObject||{})
 