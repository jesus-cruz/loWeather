$(document).ready(function() {
    var minFecha = null;
    var maxFecha = null;
        $(function () {
            $('#datetimepicker6').datetimepicker();	//inicio
            $('#datetimepicker7').datetimepicker({	//fin
                useCurrent: false // #1075
            });
            $("#datetimepicker6").on("dp.change", function (e) {
                $('#datetimepicker7').data("DateTimePicker").minDate(e.date);
                minFecha = new Date(e.date);
                var data = {};
                data.min = minFecha;
                $.ajax({
                    type: 'GET',
                    data: data,
                    contentType: 'application/json',
                    url: '/dat/',						
                    success: function(data) {
                        console.log('success');
                    }
                });
            });
            $("#datetimepicker7").on("dp.change", function (e) {
                $('#datetimepicker6').data("DateTimePicker").maxDate(e.date);
                maxFecha = new Date(e.date);
                var data={};
                data.max = maxFecha;
                $.ajax({
                    type: 'GET',
                    data: data,
                    contentType: 'application/json',
                    url: '/dat/',						
                    success: function(data) {
                        console.log('success');
                    }
                });
            });
            
        });
});
        