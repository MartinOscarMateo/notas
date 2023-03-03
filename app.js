// Pregunto si seriviceWorker esta verificado en este navegador
if ("serviceWorker" in navigator) {
    // Al cargar la página registro el sw
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(res =>
                // Cuando esta promesa termine hago un log de sw registrado
                console.log("SW registrado")).catch(err =>
            console.log("SW no registrado", err)
        );

    })

}

const btnSave = document.querySelector('#btn-save');
const textArea = document.querySelector('#text-1');
let container = document.querySelector('.collection');
let lista = [];
let btnsEliminar = [];
let idnotas = 0
let iModificar = null;

document.addEventListener('DOMContentLoaded', function () {
    let sideNav = document.querySelectorAll('.sidenav');
    let instanciaSide = M.Sidenav.init(sideNav, {});

    let modal = document.querySelectorAll('.modal');
    let instanciaModal = M.Modal.init(modal, {});

    lista = leerNotas();
    renderizarNotas(lista);
    idnotas = lista.length;
});

/* - FUNCION 1: Obtiene el texto del textArea y guarda en el texto en el array - */
btnSave.addEventListener('click', () => {

    if (textArea.value.length < 1) {
        alert("Su nota esta vacia... :(");
    } else {

        if (iModificar !== null) {
            //Editar
            lista[iModificar].nota = textArea.value;
        } else {
            // Crear
            idnotas++
            let getFecha = new Date().toLocaleString();
            let nota = {
                nota: textArea.value,
                fecha: getFecha,
                id: idnotas
            }
            lista.push(nota);
            console.log(lista)
        
        }

    }
    textArea.value = "";
    iModificar = null;
    guardarNotas(lista);

})

/* -------- FUNCION 2: Recibe el array y lo guarda en el localStorage ------- */
function guardarNotas(array) {
    localStorage.setItem('lista', JSON.stringify(array))
    renderizarNotas(array);
}

/* --------- FUNCION 3: Lee los datos del localStorage y lo retorna --------- */
function leerNotas() {
    return localStorage.getItem('lista') ?
        JSON.parse(localStorage.getItem('lista')) : [];
}

/* -------- FUNCION 4: Recibe el array y lo renderiza en el container ------- */
function renderizarNotas(array) {
    console.log(array);

    let btnid = 0;

    container.innerHTML = "";
    for (const nota of array) {
        btnid++;
        let li = document.createElement("li");
        li.innerHTML = `<span class="nota">${nota.nota}</span><span class="fecha">${nota.fecha}</span><a class="eliminar"><i class="bi bi-trash float-right btn-delete" id="${nota.id}"></i></a>`;
        // btnEditar
        let a = document.querySelector('#scale-demo').cloneNode()
        a.innerText = 'Editar'
        a.className = 'btn btn-primary modal-trigger editar'
        // a.href = "#modal1"
        a.addEventListener('click', () => {
            EditarNota(nota.id)
        })

        li.appendChild(a);

        container.appendChild(li);
    }
    btnsEliminar = document.querySelectorAll('.eliminar');
    btnsEliminar.forEach(btn => {
        btn.addEventListener('click', () => {
            eliminarNotas(parseInt(btn.id))
        })
    })
}

/* -------- Eliminar notas ------- */

function eliminarNotas(id) {
    let index = null;

    for (const i in lista) {
        console.log(lista[i])
        if (lista[i].id === id) {
            index = i;
        }
    }

    console.log("Index" + index);
    console.log("Lista" + lista);
    lista.splice(index, 1);
    guardarNotas(lista)
}

function EditarNota(id) {
    for (const indice in lista) {
        if (lista[indice].id === id) {
            console.log("Nota a modificar es:", lista[indice]);
            iModificar = indice;
        }
    }
}