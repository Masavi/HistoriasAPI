const express = require("express");
const router = express.Router();

// modelos de mongoose para manejar la base de datos
const { Historia } = require('../mongoose_client.js');

// Historias
router.route('/')

    // @GET todas
    .get((req, res) => {

        Historia
            .find()
            .populate('autor')
            .exec()
            .then(respuesta => res.status(200).send(respuesta))
            .catch(error => res.status(400).send(error))
    })

    // @POST historia
    .post((req, res) => {

        const { titulo, autor, imagen=null, cuerpo, etiquetas=[] } = req.body;

        const nuevaHistoria = Historia({
            titulo,
            autor,
            imagen,
            cuerpo,
            etiquetas
        });

        nuevaHistoria.save((error, nuevaHistoria) => {

            if (error) {
                console.log(new Error('error al crear la historia'));
                res.status(400).send(error);
            } else {
                console.log(nuevaHistoria);
                res.status(201).send(nuevaHistoria);
            }
        });

    });

// Historia Específica
router
    .route("/:id/")

    // @GET una
    .get((req, res) => {
        const { id } = req.params;

        Historia
            .findById(id)
            .exec()
            .then(respuesta => res.status(200).send(respuesta))
            .catch(error => res.status(400).send(error));
    })

    // @PUT actualizar una
    .put((req, res) => {
        const { id } = req.params;

        Historia
            .findByIdAndUpdate(
                id,
                { $set: req.body },
                { new: true })
            .exec()
            .then(historiaActualizado => res.status(200).send(historiaActualizado))
            .catch(error => res.status(400).send(error))

    })


    // @DELETE una
    .delete((req, res) => {
        const { id } = req.params;

        Historia
            .findByIdAndRemove(id)
            .exec()
            .then(() => res.status(204).send())
            .catch(error => res.status(400).send(error));
    })

module.exports = router;