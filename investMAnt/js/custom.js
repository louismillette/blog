// page load entry point
jQuery(document).ready(function($) {
	s1_d1 = [[1, 0.06, 0.34], [2, -0.16, 0.18], [3, -0.22, 0.1], [4, -0.2, 0.16], [5, -0.03, 0.26], [6, -0.13, 0.21], [7, -0.09, 0.25], [8, -0.04, 0.31], [9, 0.02, 0.25], [10, -0.16, 0.23], [11, -0.06, 0.2], [12, -0.22, 0.1], [13, -0.33, 0.01], [14, -0.26, 0.04], [15, -0.2, 0.2], [16, -0.23, 0.19], [17, -0.1, 0.22], [18, -0.02, 0.32], [19, -0.16, 0.18], [20, -0.15, 0.17], [21, -0.24, 0.13], [22, -0.12, 0.23], [23, -0.21, 0.17], [24, -0.27, 0.13], [25, -0.17, 0.12], [26, -0.19, 0.16], [27, -0.18, 0.2], [28, -0.23, 0.17], [29, -0.18, 0.21], [30, -0.22, 0.21], [31, -0.23, 0.22], [32, -0.23, 0.24], [33, -0.17, 0.18], [34, -0.24, 0.1], [35, -0.24, 0.1], [36, -0.16, 0.23], [37, -0.19, 0.2], [38, -0.25, 0.13], [39, -0.28, 0.15], [40, -0.25, 0.15]]
	s1_d2 = [[1, 0.21], [2, 0.0], [3, -0.02], [4, 0.0], [5, 0.1], [6, 0.03], [7, 0.09], [8, 0.14], [9, 0.14], [10, 0.04], [11, 0.05], [12, -0.06], [13, -0.16], [14, -0.12], [15, 0.0], [16, -0.03], [17, 0.05], [18, 0.13], [19, 0.01], [20, 0.0], [21, -0.04], [22, 0.03], [23, -0.05], [24, -0.05], [25, -0.01], [26, -0.01], [27, 0.0], [28, -0.02], [29, -0.01], [30, 0.01], [31, 0.0], [32, 0.06], [33, 0.02], [34, -0.04], [35, -0.05], [36, 0.03], [37, 0.0], [38, -0.05], [39, -0.04], [40, -0.04]]
	zeros = [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0], [11, 0], [12, 0], [13, 0], [14, 0], [15, 0], [16, 0], [17, 0], [18, 0], [19, 0], [20, 0], [21, 0], [22, 0], [23, 0], [24, 0], [25, 0], [26, 0], [27, 0], [28, 0], [29, 0], [30, 0], [31, 0], [32, 0], [33, 0], [34, 0], [35, 0], [36, 0], [37, 0], [38, 0], [39, 0], [40, 0]]
	s1 = [{
        name: 'Correlation',
        data: s1_d2,
        zIndex: 1,
        marker: {
            fillColor: 'white',
            lineWidth: 2,
            lineColor: Highcharts.getOptions().colors[0]
        }
    },{
        name: 'No Correlation Line',
        data: zeros,
        zIndex: .9,
        dashStyle: 'longdash',
        color:'black'
    }, {
        name: 'Range',
        data: s1_d1,
        type: 'arearange',
        lineWidth: 0,
        linkedTo: ':previous',
        color: Highcharts.getOptions().colors[0],
        fillOpacity: 0.3,
        zIndex: 0,
        marker: {
            enabled: false
        },
        zoneAxis:'x',
        zones: [{
            	value: 1.5,
	            color: Highcharts.getOptions().colors[5],
	        }, {
	            value: 8.5,
	            color: Highcharts.getOptions().colors[0],
	        },{
	            value: 9.5,
	            color: Highcharts.getOptions().colors[3],
	        },{
	            value: 12.5,
	            color: Highcharts.getOptions().colors[0],
	        },{
	            value: 13.5,
	            color: Highcharts.getOptions().colors[5],
	        },{
	            value: 17.5,
	            color: Highcharts.getOptions().colors[0],
	        },{
	            value: 18.5,
	            color: Highcharts.getOptions().colors[3],
	        }, {
	            color: Highcharts.getOptions().colors[0],
        }]
    }]
    s2_d1 = [[5, -0.12, 0.19], [6, 0.04, 0.45], [7, 0.06, 0.41], [8, 0.08, 0.42], [9, 0.16, 0.41], [10, 0.21, 0.45], [11, 0.17, 0.43], [12, 0.06, 0.34], [13, -0.06, 0.23], [14, -0.33, -0.01], [15, -0.46, -0.08], [16, -0.36, -0.08], [17, -0.29, 0.12], [18, -0.18, 0.12], [19, -0.01, 0.33], [20, 0.04, 0.36], [21, -0.15, 0.11], [22, -0.21, 0.09], [23, -0.16, 0.07], [24, -0.09, 0.21], [25, -0.29, 0.02], [26, -0.35, 0.02], [27, -0.28, 0.02], [28, -0.22, 0.08], [29, -0.15, 0.15], [30, -0.13, 0.17], [31, 0.0, 0.26], [32, -0.15, 0.16], [33, -0.17, 0.13], [34, -0.26, 0.1], [35, -0.08, 0.18], [36, -0.05, 0.16], [37, -0.04, 0.2], [38, -0.09, 0.11], [39, -0.14, 0.07], [40, -0.13, 0.1]]
    s2_d2 = [[5, 0.07], [6, 0.26], [7, 0.22], [8, 0.25], [9, 0.28], [10, 0.32], [11, 0.3], [12, 0.21], [13, 0.07], [14, -0.17], [15, -0.28], [16, -0.22], [17, -0.12], [18, -0.04], [19, 0.18], [20, 0.21], [21, 0.01], [22, -0.06], [23, -0.04], [24, 0.04], [25, -0.13], [26, -0.18], [27, -0.14], [28, -0.07], [29, 0.0], [30, 0.0], [31, 0.12], [32, 0.01], [33, -0.01], [34, -0.01], [35, 0.05], [36, 0.05], [37, 0.07], [38, 0.01], [39, -0.01], [40, -0.01]]
    zeros_s2 = [[5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0], [11, 0], [12, 0], [13, 0], [14, 0], [15, 0], [16, 0], [17, 0], [18, 0], [19, 0], [20, 0], [21, 0], [22, 0], [23, 0], [24, 0], [25, 0], [26, 0], [27, 0], [28, 0], [29, 0], [30, 0], [31, 0], [32, 0], [33, 0], [34, 0], [35, 0], [36, 0], [37, 0], [38, 0], [39, 0], [40, 0]]
    s2 = [{
        name: 'Correlation',
        data: s2_d2,
        zIndex: 1,
        marker: {
            fillColor: 'white',
            lineWidth: 2,
            lineColor: Highcharts.getOptions().colors[0]
        }
    },{
        name: 'No Correlation Line',
        data: zeros_s2,
        zIndex: .9,
        dashStyle: 'longdash',
        color:'black'
    }, {
        name: 'Range',
        data: s2_d1,
        type: 'arearange',
        lineWidth: 0,
        linkedTo: ':previous',
        color: Highcharts.getOptions().colors[0],
        fillOpacity: 0.3,
        zIndex: 0,
        marker: {
            enabled: false
        },
        zoneAxis:'x',
        zones: [{
	            value: 5.5,
	            color: Highcharts.getOptions().colors[0],
	        },{
	            value: 12.5,
	            color: Highcharts.getOptions().colors[5],
	        },{
	            value: 13.5,
	            color: Highcharts.getOptions().colors[0],
	        },{
	            value: 16.5,
	            color: Highcharts.getOptions().colors[5],
	        },{
	            value: 18.5,
	            color: Highcharts.getOptions().colors[0],
	        },{
	            value: 20.5,
	            color: Highcharts.getOptions().colors[5],
	        }, {
	            color: Highcharts.getOptions().colors[0],
        }]
    }]
	hc(s1, 'chart1', 'One Period Correlation x Year Lag', 'correlation between year x of a 40 year investement and the money pulled out','')
	hc(s2, 'chart2', '5 years Future Average x Year Lag Correlation', 'correlation between year x of a 40 year investement and the money pulled out','')



});

var hc = function (data, container, title, sub, tooltip_suffix) {
        Highcharts.chart(container, {
            chart: {
                zoomType: 'x'
            },

            title: {
                text: title,
                subtitle: sub
            },
            yAxis: {
                title: {
                    text: 'Correlation'
                }
            },
            xAxis: {
                min: 1,
                title: {
                	text: 'Period'
                }
            },

            tooltip: {
                crosshairs: true,
                shared: true,
                valueSuffix: tooltip_suffix
            },

            legend: {
                enabled: false
            },
            series: data
            // series: [{
            //     name: 'Temperatures',
            //     data: data
            // }]

        });
    }