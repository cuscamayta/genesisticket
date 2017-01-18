app.service('CommonService', function ($http, $q) {

    init();

    function init() {
    }

    function makes() {
        var make = {
            Suzuki: "Suzuki", Toyota: "Toyota", MercedesBenz: "Mercedes Benz",
            Nissan: "Nissan", Scania: "Scania", Volvo: "Volvo", Mitsubishi: "Mitsubishi",
            Isuzu: "Isuzu", Hino: "Hino", Volkswagen: "Volkswagen"
        };
        return make;
    }

    this.makesarray = function () {
        var makesArray = $.map(makes(), function (value, key) {
            return { value: value, data: key };
        });
        return makesArray;
    };

    function colors() {
        var color = {
            Blanco: "Blanco", Negro: "Negro", Azul: "Azul", Amarillo: "Amarillo", Verde: "Verde",
            Rojo: "Rojo", Gris: "Gris", Plateado: "Plateado", Celeste: "Celeste", Lila: "Lila"
        };
        return color;
    }

    this.colorsarray = function () {
        var colorsArray = $.map(colors(), function (value, key) {
            return { value: value, data: key };
        });
        return colorsArray;
    };
});