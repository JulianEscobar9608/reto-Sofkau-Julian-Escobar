const PreguntaDao = require('../models/dao/PreguntaDao');
const ProceduresController = require('./procedures.controller');
const JugadorDao = require('../models/dao/JugadorDao');
const Ronda = require('../models/entities/Ronda');
const RondaDao = require('../models/dao/RondaDao');


class GameController {

    static index(req, res) {

        res.render('ind');
    }

    static iniciarJuego(req, res) {

        const [dificultad, categoriaYPregunta, opciones, premio] = ProceduresController.obtenerParametros('1');
        res.render('index', { dificultad: dificultad, categoriaYPregunta, opciones, premio });

    }

    static evaluarRespuesta(req, res) {

        const preguntaAEvaluar = PreguntaDao.buscarPreguntaPorId(req.body.question);
        if (preguntaAEvaluar.getOpciones().getCorrecta() == req.body.respuesta) {
            req.session.premio = req.body.prize;
            let numeroDificultad = Number(req.body.dificult);
            if (numeroDificultad < 5) {
                
                numeroDificultad += 1;
                const [dificultad, categoriaYPregunta, opciones, premio] = ProceduresController.obtenerParametros(numeroDificultad);
                res.render('index', { dificultad: dificultad, categoriaYPregunta, opciones, premio })

            } else {
                req.session.ganador = true;
                res.redirect('/terminar')
            }
        } else {

            res.redirect('/terminar');
        }
    }

    static terminarPartida(req, res) {
        let jugador = req.session.jugador;
        let premio = req.query.retirado || req.session.ganador ? req.session.premio : '0';
        let id = RondaDao.calcularIdRonda();
        RondaDao.registrarRonda(new Ronda(id, jugador, req.query.retirado ? 'Retirado' : req.session.ganador ? 'Ganada' : 'Perdida', premio));
        res.render('finish', { jugador, premio }) 

    }

    static ingresarJugador(req, res) {
        let usuariocapturado = req.body.user
        req.session.premio = 0;
        let jugador = JugadorDao.buscarJugador(usuariocapturado);
        if (jugador != null) {
            req.session.jugador = jugador.getNombreUsuario();
            res.redirect('/iniciarJuego');
        } else {
            jugador = {
                idJugador: JugadorDao.calcularIdJugador(),
                nombreUsuario: req.body.user
            }
            JugadorDao.agregarJugador(jugador);
            req.session.jugador = JugadorDao.buscarJugador(usuariocapturado).getNombreUsuario();
            res.redirect('/iniciarJuego');
        }

    }

}

module.exports = GameController;