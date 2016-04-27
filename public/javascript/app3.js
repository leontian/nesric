(function(){
    $(init);

    var $skiSearchTxt;
    var $searchBtn;
    var EMPTY_SEARCH_URL = "/users";
    var SEARCH_URL = "/users/?s=TITLE";
    var BY_ID_URL = "/users/?id=RID";
    //var EDIT_RESORT_URL = "/edit_resorts/?id=RID";
    var $searchResults, $head_id, $head_name, $head_group;
    var $title, $id, $button, $name, $group;

    function init() {
        $head_id = $("#head_id");
        $skiSearchTxt = $("#skiSearchTxt");
        $searchBtn = $("#searchBtn");
        $searchResults = $("#searchResults").find("tbody");
        $head_name = $("#head_name");
        $head_group = $("#head_group");
        //$searchResultsDetails = $("#searchResultsDetails").find("tbody");
        $title=$("#title");
        $id=$("#id");
        $name=$("#name");
        $button=$("#button");
        $group=$("#group");
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
            var user = res[m];
            var id=user.id;
            var name=user.username;
            //var date= new Date(resort.date).toLocaleDateString();
            var group=user.group;

            $title.html(name+" Details:");
            $id.attr("value", id);
            $name.attr("value", name);
            $group.attr("value", group);
            $button.html("Update "+name).click(renderSearchResultsDetails);
        }
        console.log(res);
    }
    function renderSearchResults(res) {
        $searchResults.empty();
        for(var m=0; m<res.length; m++) {
            var user = res[m];
            //var acre=resort.acre;
            var group=user.group;
            //var date=resort.date;
            var id=user.id;
            var name=user.username;
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
                .append(group)
                .appendTo($tr);

            $head_id.html("ID");
            $head_name.html("Name");
            $head_group.html("Group");
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