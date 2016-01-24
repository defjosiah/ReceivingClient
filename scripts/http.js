
var startAggregation = function (filter, aggregator, rateUpdate, aggUpdate) {
    if (filter && aggregator) {
        startHttpHandshake(filter, aggregator, rateUpdate, aggUpdate);
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

var startHttpHandshake = function (filter, aggregator, rateUpdate, aggUpdate) {
    // Make the PUT request.
    $.ajax({
        type: "POST",
        url: "http://localhost:52403/api/get/string",
        contentType: "application/json",
        data: filter,
        dataType: "text",
        success: function (response) {
            var jsResponse = JSON.parse(response);
            requestDataDelete(jsResponse._id, jsResponse._data, aggregator, rateUpdate, aggUpdate);
        },
        error: function (error) {
            rateUpdate("----");
            aggUpdate("--------")
        }
    });
};

var requestDataDelete = function (id, data, aggregator, rateUpdate, aggUpdate) {
    console.log(arguments);
    $.ajax({
        type: "GET",
        url: "http://localhost:52403/api/delete?id=" + id,
        success: function (response) {
            console.log(data);
            rateUpdate("Woo");
            aggUpdate("double woo");
        },
        error: function (error) {
            rateUpdate("----");
            aggUpdate("--------")
        }
    });
};
// Wrap up the DELETE request execution so it can easily be
// invoked from the end of the PUT delete response.
var makeDELETERequest = function () {
    // Make the DELETE request.
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/some/url/resource/path",
        contentType: "application/json",
        data: JSON.stringify({
            name: "Tricia",
            age: 37
        }),
        dataType: "text",
        success: function (response) {
            // Put the plain text in the PRE tag.
            $("#deleteResponse").text(response);
        },
        error: function (error) {
            // Log any error.
            console.log("ERROR:", error);
        }
    });
};
