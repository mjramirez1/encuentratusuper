$(document).ready(function () {
    $("form").submit(function (event) {
        event.preventDefault()
        let valueInput = $("#heroInput").val();

        /*
                let regex = RegExp ()
                if (!regex.text(valueInput) |>=0  | <=732{
                    return
                    alert("Fuera de rango ingrese entre el 1 y el 732")
                }
        
        var buscar = document.getElementById("buscar");
        buscar.addEventListener('click',validar);
        function validar(){
        var animal = document.querySelector(".animal").value;
        var patron1 = /gato/i;
        var patron2 = /perro/i;
        if (animal.match(patron1) || animal.match(patron2)){
        alert("Palabra ingresada permitida");
        } else {
        alert("La palabra ingresada no es permitida");
        
        .>0 || <732
        }
        };
        */


        


        $.ajax({
            url: "https://www.superheroapi.com/api.php/4905856019427443/" + valueInput,
            success: function (data) {
                let nombre = data.name;
                let conexiones = data.connections["group-affiliation"];
                let imagen = data.image.url;
                let publisher = data.biography.publisher;
                let ocupacion = data.work.occupation;
                let primeraVista = data.biography["first-appearance"];
                let altura = data.appearance.height.join(" - ");
                let peso = data.appearance.weight.join(" - ");
                let alianzas = data.biography.aliases.join(" ");

                $("#heroInfo").html(`
                <h3 class="text-center">SuperHero Encontrado</h3>
                <div class=card>
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${imagen}" class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">Nombre: ${nombre}</h5>
                                <p class="card-text">Conexiones: ${conexiones}.</p>
                              <div class="container" style="max-width: 95%;">
                              <p class="card-text"><label class="fst-italic">Publicado por:</label> ${publisher}.</p>                              
                              <hr>
                              <p class="card-text"><label class="fst-italic">Ocupacion:</label> ${ocupacion}.</p>
                              <hr>
                              <p class="card-text"><label class="fst-italic">Primera aparicion:</label> ${primeraVista}.</p>
                              <hr>
                              <p class="card-text"><label class="fst-italic">Altura:</label> ${altura}.</p>
                              <hr>
                              <p class="card-text"><label class="fst-italic">Peso:</label> ${peso}.</p>
                              <hr>
                              <p class="card-text"><label class="fst-italic">Alianza:</label> ${alianzas}.</p>
                          </div>
                              <div>
                            </div>
                        </div>
                    </div>
                `);

                let estadisticas = Object.entries(data.powerstats);
                estadisticasModificadas = estadisticas.map(function (datos) {
                    return {
                        label: datos[0],
                        y: parseInt(datos[1])

                    };
                });

                

                let config = {
                    title: {
                        text: `Estadisticas de poder para ${nombre}`
                    },
                    data: [{
                        type: "pie",

                        toolTipContent: "<b>{label}</b>: {y}",
                        showInLegend: "true",
                        legendText: "{label}",

                        indexLabel: "{label} - {y}",
                        dataPoints: estadisticasModificadas
                    }]
                };

                const estadisticas = Object.entries(data.powerstats);
                const estadisticasFiltradas = estadisticas.filter((e) => e[1] !== "null");
                const estadisticasModificadas = estadisticasFiltradas.map(function (datos) {
                    return {
                        label: datos[0],
                        y: parseInt(datos[1])
                    };
                });

                console.log(estadisticasFiltradas);
                console.log(estadisticasModificadas);

                if (estadisticasModificadas.length > 0) {
                    let config = {
                        title: {
                            text: `Estadisticas de poder para ${nombre}`
                        },
                        data: [{
                            type: "pie",
                            //startAngle: 25,
                            toolTipContent: "<b>{label}</b>: {y}",
                            showInLegend: "true",
                            legendText: "{label}",
                            //indexLabelFontSize: 16,
                            indexLabel: "{label} - {y}",
                            dataPoints: estadisticasModificadas
                        }]
                    };
                    let chart = ""
                    chart = new CanvasJS.Chart("heroStats", config);
                    chart.render();

                    console.log("Funciona!!!")
                } else {
                    $("#heroStats").html(
                        `<h1 class="text-center">No hay datos disponibles de sus estadisticas</h1>`
                    )
                    console.log("Funciono el error?")
                }
                let chart = new CanvasJS.Chart("heroStats", config);
                chart.render();
            },
        })
    })
});
