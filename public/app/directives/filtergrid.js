app.filter('filterDeleteGrid', function () {
    return function (items, expression) {
        var listFiltered = [];

        angular.forEach(items, function (value) {
            if (value.state !== 0) {
                listFiltered.push(value);
            }
        });
        return listFiltered;
    };
});

app.filter('filterSelected', function () {
    return function (items, value) {
        if (!value) return;
        var listFiltered = [];
        angular.forEach(items, function (item) {

            if (item && item.id !== value.id) {
                listFiltered.push(item);
            }
        });
        return listFiltered;
    }
});