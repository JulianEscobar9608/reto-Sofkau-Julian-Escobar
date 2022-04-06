const fs = require('fs');
const path = require('path');

class RondaDao {

    static #leerRondas() {
        return JSON.parse(fs.readFileSync(path.resolve('src/data/rondas.json')));
    }

    static registrarRonda(ronda) {
        let rondas = this.#leerRondas();
        let rondaARegistrar = {
            idRonda: ronda.getIdRonda(),
            jugador: ronda.getJugador(),
            estadoPartida: ronda.getEstadoPartida(),
            cantidadGanada: ronda.getCantidadGanada()
        }

        rondas.push(rondaARegistrar);
        fs.writeFileSync(path.resolve('src/data/rondas.json'),JSON.stringify(rondas , null, 2));
    }

    static calcularIdRonda(){
        let rondas = this.#leerRondas();
        let id;
        if(rondas.length==0){
            return id = 1;
        }else{
             return id = rondas[rondas.length-1].idRonda + 1;
        }
    }


}

module.exports = RondaDao;