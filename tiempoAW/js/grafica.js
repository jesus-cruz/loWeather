var chartData;

$(function(){
  $.ajax({

    url: 'http://localhost:3001/dat',
    type: 'GET',
    success : function(data) {
      chartData = data;
      var chartProperties = {
        "caption": "Grafica de temperatura (ºC) y humedad (%)",
        "xAxisName": "Fecha",
        "yAxisName": "Grados (ºC) y Humedad (%)"
      };

      var categoriesArray = [{
          "category" : data["categories"]
      }];

      var lineChart = new FusionCharts({
        type: 'msline',
        renderAt: 'representa-grafica',
        width: '1000',
        height: '600',
        dataFormat: 'json',
        dataSource: {
          chart: chartProperties,
          categories : categoriesArray,
          dataset : data["dataset"]
        }
      });
      lineChart.render();
    }
  });
});
