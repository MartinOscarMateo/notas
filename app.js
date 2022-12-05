navigator.serviceWorker.register('sw.js');
const btnSave = document.querySelector('#btn-save');
const textArea = document.querySelector('#text-1');
let container = document.querySelector('.collection');
let lista = [];
let btnsEliminar = [];
let idnotas = 0


document.addEventListener('DOMContentLoaded', function() {
    let sideNav = document.querySelectorAll('.sidenav');
    let instanciaSide = M.Sidenav.init(sideNav  , {});

    let modal = document.querySelectorAll('.modal');
    let instanciaModal = M.Modal.init(modal, {});

    lista = leerNotas();
    renderizarNotas(lista);
    idnotas = lista.length;
});

/* - FUNCION 1:  Obtiene el texto del textArea y guarda en el texto en el array - */
btnSave.addEventListener('click', ()=>{
  let getFecha = new Date().toLocaleString();
  let nota = {
    nota: textArea.value,
    fecha: getFecha
  }
  lista.push(nota);
  textArea.value = '';
  guardarNotas(lista);
})

/* -------- FUNCION 2: Recibe el array y lo guarda en el localStorage ------- */
function guardarNotas(array){
  localStorage.setItem('lista', JSON.stringify(array));
  renderizarNotas();
}

/* --------- FUNCION 3: Lee los datos del localStorage y lo retorna --------- */
function leerNotas(){
  return localStorage.getItem('lista') ?
    JSON.parse(localStorage.getItem('lista')) : [];
}

/* -------- FUNCION 4: Recibe el array y lo renderiza en el container ------- */
function renderizarNotas(array){
  container.innerHTML= '';

  let btnid = 0;

  for (const nota of array) {
    btnid++;

    let li = document.createElement('li');

    let span = document.createElement('span');
    span.className = "nota";
    span.textContent = nota.nota;

    let span2 = document.createElement('span');
    span2.className = "fecha"
    span2.textContent = nota.fecha;

    //let tachito = document.createElement("i");
    //tachito.setAttribute("class", "bi bi-trash float-right btn-delete eliminar");
    //tachito.setAttribute("id", btnid);

    container.appendChild(li);
    li.appendChild(span);
    li.appendChild(span2);
    //li.appendChild(tachito);
  };
}

/* -------- FUNCION 5: Borrar los datos ------- */