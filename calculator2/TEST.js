var _barHeight;
var _count;
var _minBarHeight = 50;
var _data;

$(document).ready(function(e){
  Effects()
})

// creates bar chart for selection.  Returns D3 chart instance, to be used in setCount and setAmount functions 
function selectBar(container, count, value){
  if((!count)&&(count != 0)){
    count = 10;
  }
  _count = count
  if(!value){
    value=10;
  }
  _barHeight = $(container).height();
  _data = Array(count).fill(value);
  var barWidth = $(container).width();

  var y = d3.scale.pow(1)
      .domain([0, 100000])
      .range([_barHeight,0]);

  var inv_y = d3.scale.pow(1)
      .domain([_barHeight,0])
      .range([0, 100000]);

  function stretch_y(val){return ((inv_y(val)/100000)**(3))*100000};

  var chart = d3.select(container)
      .attr("width", barWidth)
      .attr("height", _barHeight);

  var bar = chart.selectAll("g")
      .data(_data)
      .enter().append("g")
      .attr("transform", function(d, i) { return "translate(" + i * (barWidth/count) + ", 0)"; });

  bar.append("rect")
      .attr("y", function(d) { return y(d); })
      .attr("height", function(d) { return _barHeight - y(d); })
      .attr("width", (barWidth/count) - 1)
      .attr("class", "box");

  bar.append("text")
      .attr("x", (barWidth/count) / 2)
      .attr("y", function(d) { return y(d) + 30; })
      .attr("dy", ".15em")
      .attr("transform", function(d, i) { return "rotate(-90," + (barWidth/count)/2 + ", " + (y(d)+30) + ")"; } )
      .text(function(d) { return '$' + d; });

  // var xAxis = d3.svg.axis()
  //     .scale(x)
  //     .orient("bottom");

  // chart.append("g")
  //     .attr("class", "x axis")
  //     .attr("transform", "translate(0," + height + ")")
  //     .call(xAxis);

  // drag the top of the rectangles

  // resize function on bars
  function tdragresize(d,i) {
    var maxheight = _barHeight
    var yf = d3.scale.pow(1)
    .domain([0, 100000])
    .range([_barHeight,0]);

    var bar_parent = d3.select(this.parentNode).select('rect');
    var text_parent = d3.select(this.parentNode).select('text');
    correct = 0
    if(_barHeight-y + _minBarHeight >= maxheight){correct = _barHeight - y + _minBarHeight - maxheight}
    y = d3.event.y
    // if(_barHeight-y <= _minBarHeight){y = _barHeight}
    // if(_barHeight-y >= maxheight){y = 0}
    
    d3.select(this).attr("y", y - _minBarHeight + correct);
    bar_parent.attr("height", _barHeight-y + _minBarHeight - correct);
    bar_parent.attr("y", y - _minBarHeight + correct);
    text_parent.attr("height", _barHeight-y + _minBarHeight - correct);
    text_parent.attr("y", y - _minBarHeight + correct);
    _data[i] = stretch_y(y)
    var thisx = barWidth/count;
    text_parent.text('$' + Math.round(stretch_y(y)))
      .attr("transform", function(d, i) { return "rotate(-90,"+ (barWidth/_count)/2 + ", " + parseInt(y - _minBarHeight + correct) + ")"; });
  }

  var dragbarw = $(container).width()/count;

  var dragbartop = bar.append("rect")
        .attr("x", function(d) { return d.x})
        .attr("y", function(d) { return y(d); })
        .attr("height", dragbarw)
        .attr("id", "dragleft")
        .attr("width", (barWidth/count)-1)
        .attr("class", "lightgreen")
        .attr("cursor", "ns-resize")
        .call(d3.behavior.drag()
        //.on("start", dragstarted)
        .on("drag", tdragresize));
        //.on("end", dragended));
  return bar

  // bar.append("text")
  //     .attr("x", function(d) { return x(d) - 3; })
  //     .attr("y", _barHeight / 2)
  //     .attr("dy", ".35em")
  //     .text(function(d) { return d; });
}
// takes the bar chart given, and changes number of bars to the select count
function setCount(container, chart, count, value){
  var chart = d3.select(container);
  var curr = chart.selectAll('g').size();
  var dragbarw = $(container).width()/count;
  
  _barHeight = $(container).height();
  var barWidth = $(container).width();
  var y = d3.scale.pow(1)
      .domain([0, 100000])
      .range([_barHeight,0]);
  function tdragresize(d,i) {
    var maxheight = _barHeight
    var bar_parent = d3.select(this.parentNode).select('rect');
    var text_parent = d3.select(this.parentNode).select('text');
    if((d3.event.y < maxheight-19)&&(d3.event.y > 20)){
      y = d3.event.y
      d3.select(this).attr("y", y);
      bar_parent.attr("height", _barHeight-y);
      bar_parent.attr("y", y);
      text_parent.attr("height", _barHeight-y);
      text_parent.attr("y", y);
    }
    // we skipped the bottom, lets set it
    if(d3.event.y > maxheight-19){ 
      y = maxheight-19
      d3.select(this).attr("y",y);
      bar_parent.attr("height", _barHeight-y);
      bar_parent.attr("y", y);
      text_parent.attr("height", _barHeight-y);
      text_parent.attr("y", y);
    }
    if(d3.event.y < 20){ 
      y = 20
      d3.select(this).attr("y",y);
      bar_parent.attr("height", _barHeight-y);
      bar_parent.attr("y", y);
      text_parent.attr("height", _barHeight-y);
      text_parent.attr("y", y);
    }
    
    var inv_y = d3.scale.pow(1)
      .domain([_barHeight,0])
      .range([0, 100000]);
    function stretch_y(val){return ((inv_y(val)/100000)**(3))*100000};

    text_parent.text('$' + Math.round(stretch_y(y)))
      .attr("transform", function(d, i) { return "rotate(-90, "+ (barWidth/count)/2 + ", " + parseInt(y) + ")"; });
  }
  if(count > curr){

    data = Array(count-curr).fill(parseInt(value));
    // lets add in some bars
    var newbars = chart.selectAll('h').data(data)
      .enter().append('g')
      .attr("transform", function(d, i) { return "translate(" + (i) * (barWidth/curr) + ", 0)"; });
    newbars.append("rect")
        .attr("y", function(d) { return y(d); })
        .attr("height", function(d) { return _barHeight - y(d); })
        .attr("width", (barWidth/curr) - 1)
        .attr("class", "box");
    newbars.append("text")
        .attr("x", (barWidth/count) / 2)
        .attr("y", function(d) { return y(d) + 30; })
        .attr("dy", ".15em")
        .attr("transform", function(d, i) { return "rotate(-90," + (barWidth/curr)/2 + ", " + (y(d)+30) + ")"; } )
        .text(function(d) { return '$' + d; });
    dragbartop = newbars.append("rect")
        .attr("x", function(d) { return d.x})
        .attr("y", function(d) { return y(d); })
        .attr("height", dragbarw)
        .attr("id", "dragleft")
        .attr("width", (barWidth/count)-1)
        .attr("class", "lightgreen")
        .attr("cursor", "ns-resize")
        .call(d3.behavior.drag()
        //.on("start", dragstarted)
        .on("drag", tdragresize));
        //.on("end", dragended));
  }
  // we need to re-assign this new function to all drags, as old functions are operating with the wrong width box assumption
  _count = count
  d3.select(container).selectAll("rect").call(d3.behavior.drag().on("drag", tdragresize));
  // d3.select(container).selectAll("text")
  
  // now lets fit them all
  
  d3.select(container).selectAll("g")
    .attr("transform", function(d, i) { return "translate(" + i * (barWidth/count) + ",0"+ '' + ")"; });
  d3.select(container).selectAll("rect")
    .attr("width", (barWidth/count) - 1)
  text = d3.select(container).selectAll("text")
      .attr("x", (barWidth/count) / 2)
      .attr("transform", function(d, i) { 
        y = parseInt(d3.select(this).attr('y'))
        return "rotate(-90," + (barWidth/count)/2 + ", " + y + ")"; 
      } )
  // text.attr("transform", function(d, i) { 
  //   return "rotate(-90," + (barWidth/count)/2 + ", " + (y(d)+30) + ")"; 
  // } )

  return chart
  
}
// set the value of all the investements
function setAmount(container, chart, value){
  //value = ((value/_barHeight)**(1/3))*_barHeight
  var inv_y = d3.scale.pow(1)
    .domain([_barHeight,0])
    .range([0, 100000]);

  function stretch_y(val){return ((inv_y(val)/100000)**(3))*100000};

  function tdragresize(d, i) {
    var maxheight = _barHeight
    //
    var bar_parent = d3.select(this.parentNode).select('rect');
    var text_parent = d3.select(this.parentNode).select('text');
    y = value
    correct = 0
    if(_barHeight-y + _minBarHeight >= maxheight){correct = _barHeight - y + _minBarHeight - maxheight}
    d3.select(this).attr("y", y - _minBarHeight + correct);
    bar_parent.attr("height", _barHeight-y + _minBarHeight - correct);
    bar_parent.attr("y", y - _minBarHeight + correct);
    text_parent.attr("height", _barHeight-y + _minBarHeight - correct);
    text_parent.attr("y", y - _minBarHeight + correct);
    _barHeight = $(container).height();
    var barWidth = $(container).width();
    _data[i] = stretch_y(y);
    var thisx = barWidth/_count;
    text_parent.text('$' + Math.round(stretch_y(y)))
      .attr("transform", function(d, i) { return "rotate(-90,"+ (barWidth/_count)/2 + ", " + parseInt(y - _minBarHeight + correct) + ")"; });
  }
  d3.select(container).selectAll("rect")
    .each(tdragresize)
}

// get the current bar values, returns them in an array
// MUST give count that is less then total number already created
function getValues(count){
  var gs = $('g').slice(0,count);
  var ary = Array(0)
  $.each(gs, function(index,value){
    val = $(value).find('text').text().replace('$','')
    ary.push(val)
  })
  ary.push(0)
  return ary
}

// on hover show text change color of other elements
function Effects(){
  $("g")
  .mouseenter(function(){
    $(this).find('.box').attr('class', 'box wow fadeInDown delay-03s animated');
    $(this).find('.box').css('fill', 'lightblue')
    $(this).find('text').css('display', 'block')
  })
  .mouseleave(function(){
    $(this).find('.box').css('fill', 'steelblue')
    //$(this).find('.box').removeClass('animated');
    $(this).find('text').css('display', 'none')
  })

}
bar1 = selectBar(".picker-chart", 31, 0)


// TEST SET UP
// $("#slider-range-year" ).slider({
//     range: false,
//     min:1,
//     max:135,
//     slide: function( event, ui ) {
//         
//         
//         setCount(".chart", bar1, ui.value, 50000);
//     }
// });
// $("#slider-height" ).slider({
//     range: false,
//     min:1,
//     max:_barHeight,
//     slide: function( event, ui ) {
//         
//         setAmount(".chart", bar1, _barHeight-ui.value);
//     }
// });