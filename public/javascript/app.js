(function(){
    $(init);

    var $skiSearchTxt;
    var $searchBtn;
    var EMPTY_SEARCH_URL = "/resorts";
    var SEARCH_URL = "/resorts/?s=TITLE";
    var BY_ID_URL = "/resorts/?id=RID"

    function init() {
        $skiSearchTxt = $("#skiSearchTxt");
        $searchBtn = $("#searchBtn");
        $searchResults = $("#searchResults tbody");
        $searchBtn.click(searchSkiResort);
    }

    function searchSkiResort(){
        var text = $skiSearchTxt.val();
        var url = EMPTY_SEARCH_URL;
        if (text){
            url = SEARCH_URL.replace("TITLE", text);
        }

        $.ajax({
            url: url,
            success: renderSearchResults
        });
    }

    function renderSearchResults(res) {
        $searchResults.empty();
        for(var m=0; m<res.length; m++) {
            var resort = res[m];
            var acre=resort.acre;
            var address=resort.address;
            var date=resort.date;
            var id=resort.id;
            var name=resort.name;
            var openStatus=resort.openStatus;
            var trails=resort.trails;
            var $tr = $("<tr>")
                .attr("id", id)
                .click(fetchDetail);
            var $td = $("<td>")
                .append(id)
                .appendTo($tr);

            $td = $("<td>")
                .append(name)
                .appendTo($tr);

            $td = $("<td>")
                .append(address)
                .appendTo($tr);

            $td = $("<td>")
                .append(date)
                .appendTo($tr);

            $td = $("<td>")
                .append(openStatus)
                .appendTo($tr);

            $td = $("<td>")
                .append(trails)
                .appendTo($tr);

            $td = $("<td>")
                .append(acre)
                .appendTo($tr);
            $searchResults.append($tr);
            console.log($searchResults);

        }
        console.log(res);
    }
    
    function fetchDetail(event) {
        var url=BY_ID_URL.replace("RID", $(event.currentTarget).attr("id"));
        $.ajax({
            url: url,
            success: renderSearchResults
        });
    }
})();