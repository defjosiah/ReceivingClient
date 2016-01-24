
var startAggregation = function (url, filter, aggregator, rateUpdate, aggUpdate) {
    if (filter && aggregator) {
        startHttpHandshake(url, filter, aggregator, rateUpdate, aggUpdate);
    }
}

var selectFilter = function (filter) {
    var query = {
        _query: {
            _query: ""
        }
    };
    switch (filter) {
        case "filter1":
            query._query._query = "filter1"
            break;
        case "filter2":
            query._query._query = "filter2"
            break;
        case "filter3":
            query._query._query = "filter3"
            break;
        case "filter4":
            query._query._query = "filter4"
            break;
        default:
            return false;
    }
    return JSON.stringify(query);
};

var selectAggregator = function (agg) {
    switch (agg) {
        case "agg-count":
            return (function (x) {
                return x + 1;
            });
        default:
            return false;
    }
};

var startHttpHandshake = function (url, filter, aggregator, rateUpdate, aggUpdate) {
    // Make the PUT request.
    $.ajax({
        type: "POST",
        url: url + "api/get/string",
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
            rateUpdate("Woo");
            aggUpdate("double woo");
        },
        error: function (error) {
            rateUpdate("delete fail");
            aggUpdate("0/s");
        }
    });
};
