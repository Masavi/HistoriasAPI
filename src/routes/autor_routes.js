const express = require("express");
const router = express.Router();

// modelos de mongoose para manejar la base de datos
const { Autor } = require('../mongoose_client.js');

// Autores
router.route('/')

    // @GET todos
    .get((req, res) => {

        Autor
        .find()
        .exec()
        .then( respuesta => res.status(200).send(respuesta) )
        .catch( error => res.status(400).send(error) )
    })

    // @POST autor
    .post((req, res) => {

        const {nombre=null, imagen=null} = req.body;
        
        const nuevoAutor = Autor({
            nombre,
            imagen
        });

        nuevoAutor.save( (error, nuevoAutor) => {

            if (error){
                console.log(new Error('error al crear el usuario'));
                res.status(400).send(error);
            } else {
                console.log(nuevoAutor);
                res.status(201).send(nuevoAutor);
            }
        });

    });

// Autor Específico
router
  .route("/:id/")

    // @GET uno
    .get((req, res) => {
        const { id } = req.params;

        Autor
        .findById(id)
        .exec()
        .then(respuesta => res.status(200).send(respuesta))
        .catch(error => res.status(400).send(error));
    })

    // @PUT actualizar
    .put((req, res) =>{
        const { id } = req.params;

        Autor
        .findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true })
        .exec()
        .then(autorActualizado => res.status(200).send(autorActualizado))
        .catch(error => res.status(400).send(error))

    })


    // @DELETE uno
    .delete((req, res) => {
        const { id } = req.params;

        Autor
        .findByIdAndRemove(id)
        .exec()
        .then(() => res.status(204).send())
        .catch(error => res.status(400).send(error));
    })

module.exports = router;