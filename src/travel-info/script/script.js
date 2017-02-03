var API_KEY = "AIzaSyCTPa0oyOS6USJvi0-sEiFWMKOv0-jV6Do",
    places_autocomplete_request = "https://maps.googleapis.com/maps/api/place/autocomplete/json?&types=(cities)&language=es_ES&key=" + API_KEY;

var pais, ciudad_salida, ciudad_destino, salida, destino, ida, vuelta, personas;

var municipio_code = "administrative_area_level_1",
    ciudad_code = "locality",
    pais_code = "country";

$(document).ready(function () {
    ciudad_salida = document.querySelector('#ciudad_salida');
    ciudad_destino = document.querySelector('#ciudad_destino');
});

function busca(placeInfo, type) {
    for (var i = 0; i < placeInfo.address_components.length; i++) {
        var addressTypes = placeInfo.address_components[i].types;
        if (addressTypes.indexOf(type) > -1) {
            var val = placeInfo.address_components[i].long_name;
            return val;
        }
    }
}

function getDatos() {
    pais = ciudad_destino.getPlace() ? busca(ciudad_destino.getPlace(), municipio_code) : undefined;
    salida = ciudad_salida.getPlace() ? busca(ciudad_salida.getPlace(), ciudad_code) : undefined;
    destino = ciudad_destino.getPlace() ? busca(ciudad_destino.getPlace(), ciudad_code) : undefined;
    ida = document.querySelector("#fechaIda").getDate();
    vuelta = document.querySelector("#fechaVuelta").getDate();
    personas = $("#personas").val();
}

function construyeURLVuelos(empty = false) {
    getDatos();
    var urlVuelos = "https://www.kayak.es/flights/";
    if (!empty && salida && destino && ida && vuelta && personas) {
        //mad-lis/2017-03-24/2017-03-28/6adults
        urlVuelos += salida.substr(0, 3);
        urlVuelos += "-";
        urlVuelos += destino.substr(0, 3);
        urlVuelos += "/";
        urlVuelos += ida;
        urlVuelos += "/";
        urlVuelos += vuelta;
        urlVuelos += "/";
        urlVuelos += personas + "adults";
    }

    return urlVuelos;
}

function testURL(url, success, error) {
    $.ajax({
        url: url,
        dataType: 'jsonp',
        jsonpCallback: null,
        statusCode: {
            200: function () {
                success();
            },
            404: function () {
                error();
            }
        }
    });
}

function doRequest(url) {
    var xhr = new XMLHttpRequest();
    xhr.onabort = function (e) {
        console.log("onabort");
        console.log(e);
    }
    xhr.onerror = function (e) {
        console.log("onerror");
        console.log(e);
    }
    xhr.onload = function (e) {
        console.log("onload");
        console.log(e);
    }
    xhr.onloadend = function (e) {
        console.log("onloadend");
        console.log(e);
    }
    xhr.onloadstart = function (e) {
        console.log("onloadstart");
        console.log(e);
    }
    xhr.onprogress = function (e) {
        console.log("onprogress");
        console.log(e);
    }
    xhr.open("GET", url);
    xhr.responseType = "document";
    xhr.send();
}

// Helper method to parse the title tag from the response.
function getTitle(text) {
    return text.match('<title>(.*)?</title>')[1];
}

function construyeURLHostales(empty = false) {
    getDatos();
    var urlHostales = "http://www.spanish.hostelworld.com/";
    if (!empty && pais && destino && ida && vuelta && personas) {
        //search?country=Escocia&city=Edimburgo&date_from=2017-03-24&date_to=2017-03-28&number_of_guests=6
        urlHostales += "search?";
        urlHostales += "country=" + pais;
        urlHostales += "&city=" + destino;
        urlHostales += "&date_from=" + ida;
        urlHostales += "&date_to=" + vuelta;
        urlHostales += "&number_of_guests=" + personas;
    }

    return urlHostales;
}

function buscarVuelos() {
    var urlVuelos = construyeURLVuelos();
    console.log(urlVuelos);
    window.open(urlVuelos);
//    testURL(urlVuelos,
//        function () {
//            window.open(urlVuelos);
//        },
//        function () {
//            window.open(construyeURLVuelos(true));
//        }
//    );
}

function buscarHostales() {
    var urlHostales = construyeURLHostales();
    console.log(urlHostales);
    testURL(urlHostales,
        function () {
            window.open(urlHostales);
        },
        function () {
            window.open(construyeURLHostales(true));
        }
    );
}
