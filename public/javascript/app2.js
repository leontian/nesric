(function(){
    $(init);

    var $skiSearchTxt;
    var $searchBtn;
    var EMPTY_SEARCH_URL = "/resorts";
    var SEARCH_URL = "/resorts/?s=TITLE";
    var BY_ID_URL = "/resorts/?id=RID";
    //var EDIT_RESORT_URL = "/edit_resorts/?id=RID";
    var $searchResults, $head_name, $head_address;
    var $title, $acre, $address, $trails, $openStatus, $date, $id, $button, $name;

    function init() {
        $skiSearchTxt = $("#skiSearchTxt");
        $searchBtn = $("#searchBtn");
        $searchResults = $("#searchResults").find("tbody");
        $head_name = $("#head_name");
        $head_address = $("#head_address");
        //$searchResultsDetails = $("#searchResultsDetails").find("tbody");
        $title=$("#title");
        $acre=$("#acre");
        $address=$("#address");
        $trails=$("#trails");
        $openStatus=$("#openStatus");
        $date=$("#date");
        $id=$("#id");
        $name=$("#name");
        $button=$("#button");
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

    function renderSearchResultsDetails(res) {
        //$searchResultsDetails.empty();
        for(var m=0; m<res.length; m++) {
            var resort = res[m];
            var acre=resort.acre;
            var address=resort.address;
            var date=resort.date;
            var id=resort.id;
            var name=resort.name;
            var openStatus=resort.openStatus;
            var trails=resort.trails;

            $title.html(name+" Details:");
            $id.attr("value", id);
            $name.attr("value", name);
            $acre.attr("value", acre);
            $address.attr("value", address);
            $date.attr("value", date);
            $openStatus.attr("value", openStatus);
            $trails.attr("value", trails);
            $button.html("Update "+name).click(renderSearchResultsDetails);
        }
        console.log(res);
    }
    function renderSearchResults(res) {
        $searchResults.empty();
        for(var m=0; m<res.length; m++) {
            var resort = res[m];
            //var acre=resort.acre;
            var address=resort.address;
            //var date=resort.date;
            var id=resort.id;
            var name=resort.name;
            //var openStatus=resort.openStatus;
            //var trails=resort.trails;
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

            $head_name.html("ID");
            $head_name.html("Name");
            $head_address.html("Address");
            $searchResults.append($tr);

            console.log($searchResults);

        }
        console.log(res);
    }

    function fetchDetail(event) {
        var url=BY_ID_URL.replace("RID", $(event.currentTarget).attr("id"));
        $.ajax({
            url: url,
            success: renderSearchResultsDetails
        });
    }
})();