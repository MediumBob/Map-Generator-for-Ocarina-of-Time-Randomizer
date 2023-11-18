function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
  }

  var mainDiv = document.getElementById('main');
  var scrollStart = 0;
  var scrollEnd = window.innerHeight;
  var scrollRange = scrollEnd - scrollStart;
  var topStart = 10;
  var topEnd = 0;
  var topRange = topEnd - topStart;
  
  function updateTop() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var scrollPercentage = (scrollTop - scrollStart) / scrollRange;
    var topValue = topStart + (scrollPercentage * topRange);
    mainDiv.style.top = topValue + '%';
  }
  
  window.addEventListener('scroll', function() {
    window.requestAnimationFrame(updateTop);
  });