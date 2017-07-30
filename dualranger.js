var thumbAuto, myThumb, stopPoint, minRange, maxRange, range;
var validity = false;
var targetThumb = '';
var ranger = document.getElementById('slider');
var thumb = document.getElementById('thumb');
var maxVal = document.getElementById('maxVal');
var minVal = document.getElementById('minVal');
var liveLabel;


var rangerFunction = function(e){
  var clientX;
  if (e.type.indexOf('touch')===0){
    if(e.targetTouches.length === 1) {
      var t = e.targetTouches[0];
      clientX = t.pageX;
    }
  }else{
    clientX = e.clientX;
  }
  var val = '$  ';
  console.log(ranger.value);
  console.log('min', minv);
  if(ranger.value > minv){
    if(ranger.value === 999){
      val = '$  1,000,000+';
    }else{
      val = val + ranger.value + ',000';
    }
    maxVal.textContent = val;
    maxVal.style.left = clientX;
  }
  if(e.clientX > minRange && e.clientX < thumbPoint){
    var txt = (e.clientX - minRange);
    var dif = 1000/range;
    txt = parseInt(txt * dif);
    thumb.style.left = e.clientX - 9 + 'px';
    minVal.value = '$  ' + (txt) +',000';
  }
};
///END RANGER FUNCTION

var startmove = function(e){
  targetThumb = e.target.id;
  initX = e.clientX;
  minRange = ranger.offsetLeft + 10;
  maxRange = minRange + ranger.offsetWidth -25;
  range = maxRange - minRange;
  stopPoint = ranger.value;
  thumbPoint = thumb.style.left;
  thumbPoint = thumbPoint.substring(0, thumbPoint.indexOf('px'));
  thumb.style.opacity = '0.5';
  console.log('Stop Point: ', stopPoint);
  console.log('Mouse Down --> trigger move listener', initX);

  if(targetThumb === 'slider'){
    setLabels(maxVal, initX, true);
  }else{
    setLabels(minVal,initX, true);
  }

  thumblistener(e);
  if(e.type.indexOf('touch') === 0){
    document.addEventListener('touchmove', function(e){
      e.preventDefault();
      thumblistener(e);
    });
  }else{
    document.addEventListener('mousemove', thumblistener);
  }
}
//END Start Move

var thumblistener = function(e){
  var targ = e.target.id;
  console.log('Target: ',targetThumb);
  var ele = '';
  if(targetThumb === 'slider') ele = maxVal;
  if(targetThumb === 'thumb') ele = minVal

  var rangerval = ranger.value;

  var x2, x1, x;
  var clientX = '';
  if (e.type.indexOf('touch')===0){
    if(e.targetTouches.length === 1) {
      var t = e.targetTouches[0];
      clientX = t.pageX;
    }
  }else{
    clientX = e.clientX;
  }
  console.log(clientX);

  stopPoint = ranger.value;
  console.log('Verify!!: ', stopPoint);
  console.log('ThumbPoint: ', thumbPoint);
  var txt = (clientX - minRange);
  var dif = 1000/range;
  txt = parseInt(txt * dif);

  if(targ === 'slider'){
    ele.textContent = '$  ' + (rangerval) + ',000';
    ele.style.left = clientX;

    if(clientX > minRange && clientX < thumbPoint){
      thumb.style.left = clientX - 9 + 'px';
      minVal.textContent = '$  ' + (txt) +',000';
      minVal.style.left = thumb.style.left;
    }
  }
  if(clientX > minRange && txt < parseInt(stopPoint) && targetThumb === 'thumb'){
    thumb.style.left = clientX - 9 + 'px';
    minVal.textContent = '$  ' + (txt) +',000';
    minVal.style.left = thumb.style.left;
  }
}
var thumbup = function(e){
  console.log('Mouse up', e);
  document.removeEventListener('mousemove', thumblistener);
  document.removeEventListener('touchmove', function(e){
    e.preventDefault();
    thumblistener(e);
  });
  thumb.style.opacity = '1';

  var ele ='';
  if (e.target.id === 'slider'){
    ele = maxVal;
  }else{
    thumbPoint = thumb.style.left;
    thumbPoint = thumbPoint.substring(0, thumbPoint.indexOf('px'));

    ele = minVal;
    ele.style.marginRight = '2px';
  }
  ele.style.border = '1px grey solid';
  ele.style.boxShadow = '0px 0px 0px Transparent';
  ele.style.color = '#265a34';
  ele.style.marginTop = '1px';
  ele.style.marginBottom = '1px';
  minVal.style.left = thumbPoint;

}

function setRanges(){
  //When the front ranger is clicked, not on the thumb, the thumb is magneted to that spot. Instead, prevent default, and have the THUMB
  //BEHIND the front ranger move too
  thumb.addEventListener('mousedown', startmove);
  thumb.addEventListener('touchstart', function(e){
    e.preventDefault();
    startmove(e);
  });
  document.addEventListener('mouseup', thumbup);
  document.addEventListener('touchend', thumbup);

  ranger.addEventListener('change', function(e){
    console.log(ranger.value);
    var val = '$  ';
    if(ranger.value === 1000){
      val = '$  1,000,000';
    }else{
      val = val + ranger.value + ',000';
    }
    maxVal.textContent = val;
    // maxVal.style.left = clientX;
  });

  ranger.addEventListener('mousedown', function(e){
    setLabels(maxVal, e.clientX, true);
    startmove(e);

    minv = 0;
    if(minVal.value){
      minv = minVal.value;
      minv = parseInt(minv.substring(3, minv.indexOf(',')))
    }

    ranger.addEventListener('mousemove', rangerFunction);
    ranger.addEventListener('mouseup', function(e){
      ranger.removeEventListener('mousemove', rangerFunction);
    })
  });

  ranger.addEventListener('touchstart', function(e){
    startmove(e);
  });
}

var resizeElements = function(){
  thumb.style.position = 'absolute';
  document.getElementById('thumb').style.top = ranger.offsetTop+ 5 + 'px';
  document.getElementById('thumb').style.left = ranger.offsetLeft+5 + 'px';
  thumbPoint = document.getElementById('thumb').style.left;
}

var setLabels = function(label, xcoord, on){
  livelabel = label;
  livelabel.style.display - 'flex';
}
