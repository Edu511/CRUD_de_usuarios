const router = require('express').Router();

const { Usuario } = require('../../db');

//Petición GET
router.get('/', async (req, res) => {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
});

//Petición POST
router.post('/', async (req, res) => {
    const usuarios = await Usuario.create(req.body);
    res.json(usuarios);
});

//Petición PUT
router.put('/:usuarioId', async (req, res) => {
    await Usuario.update(req.body, {
        where: { id: req.params.usuarioId }
    });
    res.json( {success: 'El usuario se ha modificado correctamente'});
});

//Petición DELETE
router.delete('/:usuarioId', async (req, res) => {
    await Usuario.destroy({
        where: { id: req.params.usuarioId }
    });
    res.json( {success: 'El usuario se ha eliminado correctamente'});
});

module.exports = router;