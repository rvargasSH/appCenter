var apiUrl = "http://localhost:8091/";
getCategories();
function getCategories() {
    document.getElementById("ulCategories").innerHTML = "";
    document.getElementById("divTabContainer").innerHTML = "";
    $.ajax({
        url: apiUrl + "categories/get/null",
        context: document.body
    }).done(function (result) {
        var stringSecondDiv = "";
        $('<li class="nav-item"><a class="nav-link active" data-bs-toggle="tab" href="#taball"><b>Todas</b></a></li>').appendTo('#ulCategories');
        stringSecondDiv += '<div class="tab-pane container active" id="taball"><div class="row mb-4 mt-6 d-flex justify-content-center">';
        result.forEach(element => {
            element.apps.forEach(app => {
                stringSecondDiv += '<div class="col-md-6 col-lg-3 text-center mt-2 card-custom"';
                stringSecondDiv += 'onclick="redirectToNewPage(' + app.appId + ')">';
                stringSecondDiv += '<img src="assets/img/icons/' + app.appIcon + '" alt="Dashboard" class="icon-img-two" />';
                stringSecondDiv += '<h4 class="mt-3 lh-base">' + app.appName + '</h4>';
                stringSecondDiv += '<p class="fs-0">' + app.appDescription + '</p></div>';
            });
        });
        stringSecondDiv += '</div></div>';
        result.forEach(element => {
            $('<li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#tab' + element.catId + '"><b>' + element.catDescription + '</b></a></li>').appendTo('#ulCategories');
            stringSecondDiv += '<div class="tab-pane container" id="tab' + element.catId + '"><div class="row mb-4 mt-6 d-flex justify-content-center">';
            element.apps.forEach(app => {
                stringSecondDiv += '<div class="col-md-6 col-lg-3 text-center mt-2 card-custom"';
                stringSecondDiv += 'onclick="redirectToNewPage(' + app.appId + ')">';
                stringSecondDiv += '<img src="assets/img/icons/' + app.appIcon + '" alt="Dashboard" class="icon-img-two" />';
                stringSecondDiv += '<h4 class="mt-3 lh-base">' + app.appName + '</h4>';
                stringSecondDiv += '<p class="fs-0">' + app.appDescription + '</p></div>';
            });
            stringSecondDiv += '</div></div>';
        });
        $(stringSecondDiv).appendTo('.tab-content');
        $('#ulCategories').tab();
        $('#ulCategories a:first').tab('show');
    });
}

function getInfoBySeach(search) {
    $.ajax({
        url: apiUrl + "apps/get/" + search,
        context: document.body
    }).done(function (result) {
        var stringSecondDiv = "";
        var counter = counterSecond = 0;
        $('<li class="nav-item"><a class="nav-link active" data-bs-toggle="tab" href="#taball"><b>Resultados</b></a></li>').appendTo('#ulCategories');
        stringSecondDiv += '<div class="tab-pane container active" id="taball"><div class="row mb-4 mt-6 d-flex justify-content-center">';
        result.forEach(element => {
            document.getElementById("ulCategories").innerHTML = "";
            document.getElementById("divTabContainer").innerHTML = "";
            stringSecondDiv += '<div class="col-md-6 col-lg-3 text-center mt-2 card-custom"';
            stringSecondDiv += 'onclick="redirectToNewPage(' + element.appId + ')">';
            stringSecondDiv += '<img src="assets/img/icons/' + element.appIcon + '" alt="Dashboard" class="icon-img-two" />';
            stringSecondDiv += '<h4 class="mt-3 lh-base">' + element.appName + '</h4>';
            stringSecondDiv += '<p class="fs-0">' + element.appDescription + '</p></div>';
            counter++;
        });
        stringSecondDiv += '</div></div>';
        $(stringSecondDiv).appendTo('.tab-content');
    });
}
function redirectToNewPage(idApp) {
    $.ajax({
        url: apiUrl + "apps/find/" + idApp,
        context: document.body
    }).done(function (result) {
        window.open(result.appUrl, '_blank');
    });
}
$("#searchByName").keyup(function () {
    if ($("#searchByName").val().length <= 0) {
        getCategories();
    } else {
        getInfoBySeach($("#searchByName").val());

    }
});