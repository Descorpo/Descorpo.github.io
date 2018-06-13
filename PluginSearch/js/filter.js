const FilterTask = (function () {
    const newFilter = function (val) {
        return Tasks.getInstance().getTasks()
            .filter(function (e) { return e.text.toLowerCase().match(val) });
    };

    return {
        newFilter
    }
})();