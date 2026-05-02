const persona = {
    codigo : "",
    nombre : "",
    apellido : "",
    notas : {
        nota1 : 0,
        nota2 : 0,
        nota3 : 0,
        nota4 : 0
    }
}

let personas = []


function guardar(){

    persona.codigo = document.getElementById("codigo").value

    const resultado = buscarporcodigo(persona.codigo)
    if (resultado == undefined ){
        persona.nombre = document.getElementById("nombre").value
        persona.apellido = document.getElementById("apellido").value
        persona.notas.nota1 = parseFloat(document.getElementById("n1").value)
        persona.notas.nota2 = parseFloat(document.getElementById("n2").value)
        persona.notas.nota3 = parseFloat(document.getElementById("n3").value)
        persona.notas.nota4 = parseFloat(document.getElementById("n4").value)
        let datos = JSON.stringify(persona)
        datos = JSON.parse(datos)
        personas.push(datos)
            imprimir()
        promediogeneral()

    }
    else
        alert('Ya existe un estudiante con ese codigo ...')
}

function promediogeneral()
{
    promedio =  (sumatoriageneral()) / personas.length
    document.getElementById("promedio").innerText = promedio

}

function buscarporcodigo(codigo){
    let resultado =   personas.find((e)=>{
            return e.codigo == codigo

    })
        return resultado
}
function sumatoriageneral(){
    const totalgeneral =  personas.reduce((total, e) => {
            return   total + ((e.notas.nota1 + e.notas.nota2 + e.notas.nota3 + e.notas.nota4) / 4)
    }, 0);
    return totalgeneral
}


function imprimir(){
    let texto = `<table class="table table-dark table-hover" border="1">
                <thead>
                    <th>CODIGO</th>
                    <th>APELLIDO</th>
                    <th>NOMBRE</th>
                    <th>NOTA 1</th>
                    <th>NOTA 2</th>
                    <th>NOTA 3</th>
                    <th>NOTA 4</th>
                    <th>DEFINITIVA</th>
                </thead>`

    for (data of personas){
    
        let definitiva = (data.notas.nota1 + data.notas.nota2 +data.notas.nota3 + data.notas.nota4)/ 4
    
        let clase = "";
        let estado = "";

    if (definitiva >= 3) {
    clase = "aprobado";   
    estado = "Aprobado";
} else {
    clase = "reprobado";  
    estado = "Reprobado";
}


        texto += `<tr class="${clase}"> 
                    <td>${data.codigo}</td>
                    <td>${data.apellido}</td>
                    <td>${data.nombre}</td>
                    <td>${data.notas.nota1}</td>
                    <td>${data.notas.nota2}</td>
                    <td>${data.notas.nota3}</td>
                    <td>${data.notas.nota4}</td>

                    <td>${definitiva}</td>
                </tr>`
    }
    document.getElementById("datos").innerHTML = texto
}
