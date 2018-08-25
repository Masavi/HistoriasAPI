const mongoose = require('mongoose');
const uri = "mongodb://masavi:WRugNuwiOvgetA4@ds233452.mlab.com:33452/historias";

mongoose.connect(
    uri,
    {useNewUrlParser: true},
    ()=>{ console.log(`\n\t-> conexión exitosa con mlab`)});

const Schema   = mongoose.Schema;
const ObjectId = mongoose.Schema.ObjectId;

const autorSchema = new Schema({
    _id:    { type: ObjectId, auto: true },
    nombre: { type: String, required: true},
    imagen: String
});

const historiaSchema = new Schema({
    _id:            { type: ObjectId, auto: true },
    titulo:         { type: String, required: true },
    autor:          { type: ObjectId, ref: 'Autor' , required: true },
    imagen:         String,
    cuerpo:         { type: String, required: true },
    fecha:          { type: Date, default: Date.now },
    etiquetas:      [String],
});

const Autor    = mongoose.model('Autor', autorSchema);
const Historia = mongoose.model('Historia', historiaSchema);

module.exports = {Autor, Historia}