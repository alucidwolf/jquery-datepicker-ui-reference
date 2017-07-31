$(function() {
    // Birthday datepicker
    // Restrict selections from the previous 18 years as of today
    $("#birthdayInput").datepicker({
        maxDate: "-18y",
        changeMonth: true,
        changeYear: true,
        beforeShow: function() {
            $(".ui-datepicker-month").addClass("form-control");
            $(".ui-datepicker-year").addClass("form-control");
        }
    });

    // Booking datepicker
    // To and From fields with logic for selecting date range
    var today = new Date(),
        tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000),
        dateFormat = "mm/dd/yy";
    var from = $("#bookNowInputFrom")
        .datepicker({
            minDate: today,
            numberOfMonths: 1,
            changeMonth: true,
            changeYear: true
        })
        .datepicker("setDate", today)
        .on("change", function() {
            var minDate = getDate(this);

            minDate.setDate(minDate.getDate() + 1);
            to.datepicker("option", "minDate", minDate);
        })
        .keydown(function(e) {
            var code = e.keyCode || e.which;

            if (code !== "9") {
                if (code === "37" || code === "38" || code === "39" || code === "40") {
                    var parts = $(this).val().split("/");
                    var currentDate = newDate(parts[2], parts[0] - 1, parts[1]);

                    switch (code) {
                        case 37:
                            currentDate.setDate(currentDate.getDate() - 1);
                            break;
                        case 38:
                            currentDate.setDate(currentDate.getDate() - 7);
                            break;
                        case 39:
                            currentDate.setDate(currentDate.getDate() + 1);
                            break;
                        case 40:
                            currentDate.setDate(currentDate.getDate() + 7);
                            break;
                    }
                    if (currentDate !== null) {
                        $(this).datepicker("setDate", currentDate);
                    }
                } else if (code === "9") {
                    if ($(".ui-datepicker-month").is(":focus")) {
                        $(".ui-datepicker-year").focus();
                    } else {
                        $(".ui-datepicker-month").focus();
                    }
                } else {
                    return false;
                }
            }
        });
    var to = $("#bookNowInputTo")
        .datepicker({
            minDate: tomorrow,
            numberOfMonths: 1,
            changeMonth: true,
            changeYear: true,
        })
        .datepicker("setDate", tomorrow)
        .on("change", function() {
            var minDate = getDate(this);
            minDate.setDate(minDate.getDate() - 1);
        })
        .keydown(function(e) {
            var code = e.keyCode || e.which;
            if (code !== "9") {
                if (code === "37" || code === "38" || code === "39" || code === "40") {
                    var parts = $(this).val().split("/");
                    var currentDate = new Date(parts[2], parts[0] - 1, parts[1]);

                    switch (code) {
                        case 37:
                            currentDate.setDate(currentDate.getDate() - 1);
                            break;
                        case 38:
                            currentDate.setDate(currentDate.getDate() - 7);
                            break;
                        case 39:
                            currentDate.setDate(currentDate.getDate() + 1);
                            break;
                        case 40:
                            currentDate.setDate(currentDate.getDate() + 7);
                            break;
                    }
                    if (currentDate !== null) {
                        $(this).datepicker("setDate", currentDate);
                    }
                } else if (code === "9") {
                    if ($(".ui-datepicker-month").is(":focus")) {
                        $(".ui-datepicker-year").focus();
                    } else {
                        $(".ui-datepicker-month").focus();
                    }
                } else {
                    return false;
                }
            }
        });

    $("#bookNowInputFrom, #bookNowInputTo").focus(function() {
        $(this).datepicker("show");
    });

    function getDate(el){
      var date;
      try{
        date = $.datepicker.parseDate(dateFormat, el.value);
      } catch(err){
        date = null;
      }
      return date;
    }

});
