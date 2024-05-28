//Constructors
function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

// Realiza la cotizacion con los datos

Seguro.prototype.cotizarSeguro = function() {
    /*
        1 y 5 = vokswagen y chevrolet = 1.15
        2 y 3 = ford y peugeot = 1.35
        4 y 6 = fiat y renault = 1.05
    */

    let cantidad;
    const base = 40000;

    switch (this.marca) {
        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.35;
            break;
        case '3':
            cantidad = base * 1.35;
            break;
            case '4':
            cantidad = base * 1.05;
            break;
        case '5':
            cantidad = base * 1.15;
            break;
        case '6':
            cantidad = base * 1.05;
            break;
        default:    
            break;
    }
    ;

    // leer el año

    const diferencia = new Date().getFullYear() - this.year;

    // cada año que la diferencia es mayor, el costo va a reducirse un 3%

    cantidad -= ((diferencia * 3) * cantidad) / 100;
    

    /*
        si el seguro es contra terceros se multiplica por 30% mas
        si el seguro es completo se multiplica por 50% mas
    */
   if (this.tipo === 'contra terceros') {
       cantidad *= 1.30;
   }
   else{
       cantidad *= 1.50;
    }
    return cantidad;
    
}

function UI() {}


// llena las opciones de los años

UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear(),
        min = max - 24;

    const selectYear = document.querySelector('#year');
    for (let i = max; i > min; i--) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}

// muestra alertas en pantalla
UI.prototype.mostrarMensaje = (mensaje, tipo) => {
    const div = document.createElement('div');
    if (tipo === 'error'){
        div.classList.add('error');
    }
    else{
        div.classList.add('correcto');
    }
    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;

    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));

    setTimeout(() => {
        div.remove();
    }, 3000);

}

UI.prototype.mostrarResultado = (total, seguro) => {
    const {marca, year, tipo} = seguro;
    let textoMarca;
    switch (marca) {
        case '1':
            textoMarca = 'Volkswagen';
            break;
        case '2':
            textoMarca = 'Ford';
            break;
        case '3':
            textoMarca = 'Peugeot';
            break;
        case '4':
            textoMarca = 'Renault';
            break;
        case '5':
            textoMarca = 'Chevrolet';
            break;
        case '6':
            textoMarca = 'Fiat';
            break;
        default:
            break;
    }

    // crear el resultado
    const div = document.createElement('div');
    div.classList.add('mt-10');
    div.innerHTML = `
        <p class="header">Tu Cotización</p>
        <p class="font-bold">Marca: <span class="font-normal">${textoMarca}</span></p>
        <p class="font-bold">Año: <span class="font-normal">${year}</span></p>
        <p class="font-bold">Tipo: <span class="font-normal capitalize">${tipo}</span></p>
        <p class="font-bold">Total: <span class="font-normal">$${total}</span></p>
    `;

    const resultadoDiv = document.querySelector('#resultado');

    // mostrar spinner
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';
    setTimeout(() => {
        spinner.style.display = 'none';
        resultadoDiv.appendChild(div);
    }, 3000);

    

}

// instanciar UI

const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
    ui.llenarOpciones();
    EventListeners();
})


function EventListeners() {
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(e) {
    e.preventDefault();
    const marca = document.querySelector('#marca').value;
    const year = document.querySelector('#year').value;
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if (marca === '' || year === '' || tipo === '') {
        ui.mostrarMensaje('Todos los campos son obligatorios','error');
        return;
    } 
    ui.mostrarMensaje('Cotizando...','correcto');

    // ocultar las cotizaciones previas

    const resultados = document.querySelector('#resultado div');
    if (resultados != null) {
        resultados.remove();
    }

    // instanciar seguro

    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro();

    // utilzar el prototype que va a cotizar

    ui.mostrarResultado(total, seguro);
}



