var _diff;

function HandleCalculator(version){   
    /*
    Handle Drop down selections
    */
    $('#' + version).find('.dropbtn').click(function(e){
        e.preventDefault();
    })
    //state dropdown
    $('#' + version).find(".state").click(function(e){
        e.preventDefault()
        var state = this.text;
        $('#' + version).find('#stateselect').html(state);
        $('#' + version).find('#stateDropdown').toggleClass("show");
    })
    //filling drop down
    $('#' + version).find(".filing-status").click(function(e){
        e.preventDefault()
        var status = this.text;
        $('#' + version).find('#filingselect').html(status);
        $('#' + version).find('#filingDropdown').toggleClass("show");
    })

    // tax dropdown
    $('#' + version).find(".tax-status").click(function(e){
        e.preventDefault()
        var status = this.text;
        $('#' + version).find('#taxselect').html(status);
        $('#' + version).find('#taxDropdown').toggleClass("show");

    })
    // fund dropdown
    $('#' + version).find(".fund").click(function(e){
        e.preventDefault()
        var fund = this.text;
        $('#' + version).find('#fundselect').html(fund);
        $('#' + version).find('#fundDropdown').toggleClass("show");
        switch(fund) {
            case 'S&P 500':
                minn = 1880
                maxx = 2015
                MER = 0.05
                break;
            case 'CIBC Balanced Fund*':
                minn = 1987
                maxx = 2017
                MER = 2.4
                break;
            case 'CIBC Canadian Index Fund*':
                minn = 1996
                maxx = 2017
                MER = 2.4
                break;
            case 'CIBC U.S Broad Market Index Fund*':
                minn = 1991
                maxx = 2017
                MER = 1.18
                break;
            case 'CIBC Canadian Small-Cap Fund*':
                minn = 1991
                maxx = 2017
                MER = 2.56
                break;
            default:
                minn = 1880
                maxx = 2015
                MER = 1.0

        }
        $('#' + version).find( "#slider-range-year" ).slider({
            range: true,
            min: minn,
            max: maxx,
            slide: function( event, ui ) {
                $('#' + version).find( "#amount-year" ).val(ui.values[ 0 ] + " - " + ui.values[ 1 ] );
                setCount(".picker-chart", ui.values[ 1 ] - ui.values[ 0 ], 50000);
                _diff = ui.values[1] - ui.values[0]
            }
        });
        $('#' + version).find( "#amount-year" ).val(
            $('#' + version).find( "#slider-range-year" ).slider( "values", 0 ) + " - " + $('#' + version).find( "#slider-range-year" ).slider( "values", 1 ) 
        ); 
            // Fee
        $('#' + version).find( "#slider-range-fee" ).slider({
            range: false,
            min: 0,
            max: 10000,
            value: MER,
            slide: function( event, ui ) {
                $('#' + version).find( "#amount-fee" ).val(Math.round(100000 * (ui.value/10000)**3)/1000 + ' %');
            }
        });
        $('#' + version).find( "#amount-fee" ).val(MER + ' %');
    })

    /*
    Slider Functions
    */
    //year range
    if(version == "v1"){
        $('#' + version).find( "#slider-range-year" ).slider({
            range: true,
            min: 1880,
            max: 2015,
            values: [ 1910, 1940 ],
            slide: function( event, ui ) {
                $('#' + version).find( "#amount-year" ).val(ui.values[ 0 ] + " - " + ui.values[ 1 ] );
                setCount(".picker-chart", bar1, ui.values[ 1 ] - ui.values[ 0 ], 50000);
                _diff = ui.values[1] - ui.values[0];
                Effects()
            }
        });
        $('#' + version).find( "#amount-year" ).val(
            $('#' + version).find( "#slider-range-year" ).slider( "values", 0 ) + " - " + $('#' + version).find( "#slider-range-year" ).slider( "values", 1 ) 
        );        
    }
    if(version == "v2"){
        $('#' + version).find( "#slider-range-year" ).slider({
            range: false,
            min:1,
            max:135,
            slide: function( event, ui ) {
                $('#' + version).find( "#amount-year" ).val(ui.value);
            }
        });
        $('#' + version).find( "#amount-year" ).val($('#' + version).find( "#slider-range-year" ).slider( "value" ) );  
    }


    // Income
    $('#' + version).find( "#slider-range-income" ).slider({
        range: false,
        min: 0,
        max: 1000,
        value: 0,
        slide: function( event, ui ) {
            $('#' + version).find( "#amount-income" ).val('$ ' + Math.round(1000000 * (ui.value/1000)**2));
        }
    });
    $('#' + version).find( "#amount-income" ).val('$ ' + $('#' + version).find( "#slider-range-income" ).slider( "value" ) );

    // Contribution
    $('#' + version).find( "#slider-range-contribution" ).slider({
        range: false,
        min: 0,
        max: 1000,
        value: 0,
        slide: function( event, ui ) {
            $('#' + version).find( "#amount-contribution" ).val('$ ' + Math.round(800000 * (ui.value/1000)**3));
            bar1 = setAmount(".picker-chart", bar1, _barHeight-ui.value);
        }
    });
    $('#' + version).find( "#amount-contribution" ).val('$ ' + $('#' + version).find( "#slider-range-contribution" ).slider( "value" ) );

    // Fee
    $('#' + version).find( "#slider-range-fee" ).slider({
        range: false,
        min: 0,
        max: 10000,
        value: 1.0,
        slide: function( event, ui ) {
            $('#' + version).find( "#amount-fee" ).val(Math.round(100000 * (ui.value/10000)**3)/1000 + ' %');
        }
    });
    $('#' + version).find( "#amount-fee" ).val($('#' + version).find( "#slider-range-fee" ).slider( "value" ) + ' %');


    /*
    Request to API
    */

    $('#' + version).find("#form").submit(function(e){
        e.preventDefault()
        if(version == "v1"){
            var yearng = this[0].value;
            var frm = yearng.split('-')[0].replace(' ','') + "-01-01";
            var to = yearng.split('-')[1].replace(' ','') + "-01-01";
            var span = parseInt(yearng.split('-')[1]) - parseInt(yearng.split('-')[0]);
        }
        else{
            var span = this[0].value;
        }
        var income = this[1].value.replace(' ','').replace('$','').replace(',','');
        var contributions = this[2].value.replace(' ','').replace('$','').replace(',','').toLowerCase();
        var fee = parseFloat(this[3].value.replace(' ','').replace('%','').replace(',',''))/100;
        var state = $(this[4]).text().toLowerCase();
        var filing = $(this[6]).text().toLowerCase();
        var tax = $(this[8]).text();
        var fund = $(this[10]).text().replace('*','');
        if(tax == '401k'){
            tax="true"
        }
        else if((tax == 'None (Taxes)')||(tax == 'Tax Status')){
            tax="false"
        }
        else{
            tax="false"
        }
        if((fund == 'Fund')||(fund == 'S&P 500')){
            console.log(fund)
            fund="S and P 500"
            console.log('hit')
        }
        state = (state == "your state" ?  "Wyoming" : state);
        filing = (filing == "Single" || filing == "Married" ?  filing : "single");
        contributions_explicit = getValues(_diff);
        contributions_explicit.push(0);
        console.log(contributions_explicit)
        if(version == "v1"){
            submission1 = {
                "v":"1",
                "frm": frm,
                "to": to,
                "state": state,
                "income": income,
                "contributions": contributions,
                "filing": filing,
                "taxdef": tax,
                "fee": fee,
                "fund": fund,
                "contributions_explicit": JSON.stringify(contributions_explicit)
            }
            submission2 = {
                "v":"2",
                "span":span + 1,
                "state": state,
                "income": income,
                "contributions": contributions,
                "filing": filing,
                "taxdef": tax,
                "fee": fee,
                "fund": fund,
                "contributions_explicit": JSON.stringify(contributions_explicit)
            }
        }
        else{
            submission1 = {
                "v":"2",
                "span":span + 1,
                "state": state,
                "income": income,
                "contributions": contributions,
                "filing": filing,
                "taxdef": tax,
                "fee": fee,
                "fund": fund,
                "contributions_explicit": JSON.stringify(contributions_explicit)
            }
        }
        console.log(submission1)
        $('#' + version).find(".loading").html('<img src="http://www.mytreedb.com/uploads/mytreedb/loader/ajax_loader_gray_512.gif" style="width:35px;height:35px;"></img>')
        console.log('Submitted!')
        $.ajax({
            type: 'GET',
            dataType: 'jsonp',
            url: "https://n5045xjtrf.execute-api.us-east-1.amazonaws.com/Beta/investement",
            data: submission1,
            jsonpCallback: "localJsonpCallback(" + version + ',' + span + ',' + contributions + ',',
            error: function(data) {
                $('#' + version).find(".loading").html(data.error())
            }
        });
        if(version=="v1"){
            $.ajax({
                type: 'GET',
                dataType: 'jsonp',
                url: "https://n5045xjtrf.execute-api.us-east-1.amazonaws.com/Beta/investement",
                data: submission2,
                jsonpCallback: "localJsonpCallback(" + "v2" + ',' + span + ',' + contributions + ',',
                error: function(data) {
                    $('#' + version).find(".loading").html(data.error())
                }
            }); 
        }

    })
};

function localJsonpCallback(version, span, contribution, json) {
    console.log('RET VALS')
    console.log(json)
    console.log('END RET VALS')
    version = $(version).attr('id')
    //console.log(version)
    if(json.error){
        console.log('CALLBACK')
        $(version).find(".loading").html('ERROR: ' + json.error)
        return
    }
    data = json.data
    money = data[0]
    $.each(money,function(index,val){val[0] = (new Date(val[0])).getTime()});
    tax = data[1]
    $.each(tax,function(index,val){val[0] = (new Date(val[0])).getTime()});
    fee = data[2]
    $.each(fee,function(index,val){val[0] = (new Date(val[0])).getTime()});
    contributions = data[3]
    $.each(contributions,function(index,val){val[0] = (new Date(val[0])).getTime()});
    $('#' + version).find(".loading").html('')
    if(version == "v1"){
        series=[{
            name:'Money Recieved',
            type:'area',
            fillColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 1,
                    y2: 1
                },
                stops: [
                    [0, Highcharts.getOptions().colors[0]],
                    [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                ]
            },
            data: money
        },
        {
            name:'Taxes',
            type:'area',
            fillColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 1,
                    y2: 1
                },
                stops: [
                    [0, Highcharts.getOptions().colors[1]],
                    [1, Highcharts.Color(Highcharts.getOptions().colors[1]).setOpacity(0).get('rgba')]
                ]
            },
            data: tax
        },
        {
            name:'Fees',
            type:'area',
            fillColor: {
            linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 1,
                    y2: 1
                },
                stops: [
                    [0, Highcharts.getOptions().colors[2]],
                    [1, Highcharts.Color(Highcharts.getOptions().colors[2]).setOpacity(0).get('rgba')]
                ]
            },
            data: fee
        },{
            name:'Money Invested',
            dashStyle:'longdash',
            color:Highcharts.getOptions().colors[3],
            data: contributions
        }];   
    }
    if(version == "v2"){
        var hist = [];
        $.each(money,function(index,value){
            hist.push(Math.round(value[1],2) - Math.round(contributions[index][1],2))
        })
        series=[{
            name:'Money Recieved',
            type:'area',
            color:Highcharts.getOptions().colors[0],
            data: money
        },
        {
            name:'Taxes',
            type:'area',
            color:Highcharts.getOptions().colors[1],
            data: tax
        },
        {
            name:'Fees',
            type:'area',
            color:Highcharts.getOptions().colors[2],
            data: fee
        },
        {
            name:'Money Invested',
            dashStyle:'longdash',
            color:Highcharts.getOptions().colors[3],
            data: contributions
        }];
        histSeries =[{
            name: 'Real Dollar Profit',
            data: binData(hist)
        }]
    }

    if((version == "v1")&&(parseInt(tax[tax.length-1][1]) > parseInt(fee[fee.length-1][1]))){
        series = [series[0], series[2], series[1], series[3]]
    }
    $('#' + version).find('#chartcontainer').html('<div class="calc-container"><div id="' + version + 'mainchart" style="min-width: 310px; height: 400px; margin: 0 auto">');
    console.log(series)
    if(version == "v1"){
        graphMoney(version, series, money.length + ' Year Returns', 'All Money in real 2017 dollars, accounted for taxes, fees, and dividends');
    }
    else{
        $('#v2').find('#chartcontainer').append('<div class="calc-container"><div id="' + 'histogram" style="min-width: 310px; height: 400px; margin: 0 auto">');
        graphMoney(version, series, 'Every ' + (parseInt(span)+1).toString() + ' Year Span of returns', 'Each point is the starting year through ' + parseInt(span) + ' years from the starting point');    
        graphMoneyHist(version, histSeries, 'Histogram of Returns less Contributions', parseInt(span)+1 + ' year returns distribution');    

    }
}

function graphMoney(version, series,title, subtitle) {
    Highcharts.stockChart(version + 'mainchart', {
        rangeSelector: {
            buttons: [{
                type: 'year',
                count: 5,
                text: '5y'
            }, {
                type: 'year',
                count: 10,
                text: '10y'
            }, {
                type: 'all',
                count: 1,
                text: 'All'
            }],
            selected: 2,
            inputEnabled: false
        },
        title:{
            text: title
        },
        subtitle:{
            text: subtitle
        },
        yAxis: {
            labels: {
                formatter: function () {
                    return '$' + (this.value > 0 ? ' + ' : '') + this.value;
                }
            },
            plotLines: [{
                value: 0,
                width: 2,
                color: 'silver'
            }]
        },
        xAxis: {
            type: 'datetime',
            title: {
                text: 'Date'
            },
        },
        plotOptions: {
            series: {
                showInNavigator: true,
                allowPointSelect: true,
            },
        },

        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>$ {point.y}</b> <br/>',
            valueDecimals: 2,
            split: true,
        },
        series: series
    });
};
function graphMoneyHist(version, series, title, subtitle){
    Highcharts.chart('histogram', {
        chart: {
            type: 'column',
        },
        title:{
            text: title
        },
        subtitle:{
            text: subtitle
        },
        xAxis: {
            title: { text: 'Returns' }
        },
        yAxis: {
            title: { text: 'Frequency' }
        },
        series: series
    });
}

//all credit to these guys for this function -> https://www.highcharts.com/blog/post/213-histogram-when-why-how/ 
function binData(data) {

  var hData = new Array(), //the output array
    size = data.length, //how many data points
    bins = Math.round(Math.sqrt(size)); //determine how many bins we need
  bins = bins > 50 ? 50 : bins; //adjust if more than 50 cells
  var max = Math.max.apply(null, data), //lowest data value
    min = Math.min.apply(null, data), //highest data value
    range = max - min, //total range of the data
    width = range / bins, //size of the bins
    bin_bottom, //place holders for the bounds of each bin
    bin_top;

  //loop through the number of cells
  for (var i = 0; i < bins; i++) {

    //set the upper and lower limits of the current cell
    bin_bottom = min + (i * width);
    bin_top = bin_bottom + width;

    //check for and set the x value of the bin
    if (!hData[i]) {
      hData[i] = new Array();
      hData[i][0] = bin_bottom + (width / 2);
    }

    //loop through the data to see if it fits in this bin
    for (var j = 0; j < size; j++) {
      var x = data[j];

      //adjust if it's the first pass
      i == 0 && j == 0 ? bin_bottom -= 1 : bin_bottom = bin_bottom;

      //if it fits in the bin, add it
      if (x > bin_bottom && x <= bin_top) {
        !hData[i][1] ? hData[i][1] = 1 : hData[i][1]++;
      }
    }
  }
  $.each(hData, function(i, point) {
    if (typeof point[1] == 'undefined') {
      hData[i][1] = 0;
    }
  });
  return hData;
}


HandleCalculator("v1");
HandleCalculator("v2");