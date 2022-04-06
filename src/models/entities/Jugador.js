class Jugador{

    #idJugador;
    #nombreUsuario;

    constructor(id,nombreUsuario){
        this.#idJugador = id;
        this.#nombreUsuario = nombreUsuario;
    }

    getIdJugador(){
        return this.#idJugador   
    }

    getNombreUsuario(){
        return this.#nombreUsuario;   
    }

    setIdJugador(idJugador){
        this.#idJugador = idJugador
    }

    setNombreUsuario(nombreUsuario){
        this.#nombreUsuario = nombreUsuario;   
    }


}

module.exports = Jugador;