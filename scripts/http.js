var _count = 0;
var _startTime = 0;

var startAggregation = function (url, filter, aggregator, rateUpdate, aggUpdate) {
    if (filter && aggregator && url) {
        _count = 0;
        _startTime = new Date().getTime() / 1000;
        for (var i = 0; i < 100; i++) {
            startHttpHandshake(url, filter, aggregator, rateUpdate, aggUpdate);
        };
    }
};

var selectFilter = function (filter) {
    var query = {
        _query: ""
    };
    switch (filter) {
        case "filter1":
            query._query = "1"
            break;
        case "filter2":
            query._query = "2"
            break;
        case "filter3":
            query._query = "3"
            break;
        case "filter4":
            query._query = "4"
            break;
        default:
            return false;
    }
    return JSON.stringify(query);
};

var selectAggregator = function (agg) {
    switch (agg) {
        case "agg-count":
            return (function (data) {
                _count = _count + 1;
            });
        default:
            return false;
    }
};

var startHttpHandshake = function (url, filter, aggregator, rateUpdate, aggUpdate) {
    // Make the PUT request.
    $.ajax({
        type: "POST",
        url: url + "api/get",
        contentType: "application/json",
        data: filter,
        dataType: "text",
        success: function (response) {
            var jsResponse = JSON.parse(response);
            requestDataDelete(url, jsResponse._id, jsResponse._data, aggregator, rateUpdate, aggUpdate);
        },
        error: function (error) {
            rateUpdate("post fail");
            aggUpdate("0/s");
        }
    });
};

var requestDataDelete = function (url, id, data, aggregator, rateUpdate, aggUpdate) {
    $.ajax({
        type: "GET",
        url: url + "api/delete?id=" + id,
        success: function (response) {
            console.log(data);
            aggregator();
            var elapsedTime = new Date().getTime() / 1000;
            rateUpdate((_count/(elapsedTime - _startTime)).toString());
            aggUpdate(_count.toString());
        },
        error: function (error) {
            rateUpdate("delete fail");
            aggUpdate("0/s");
        }
    });
};
