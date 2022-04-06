const express = require("express");
const axios = require("axios");
const { Model } = require("../db");

const router = express.Router();
module.exports = router;

const info = async () => {
  return await Model.findAll();
};

router.get("/", async (req, res) => {
  const { name } = req.query;
  const empresas = await info();
  if (name) {
    res.send(
      empresas.filter((e) =>
        e.nombre.toLowerCase().includes(name.toLocaleLowerCase())
      )
    );
  } else res.send(empresas);
});

router.post("/", async (req, res) => {
  try {
    const { nombre, razon_social, nit, telefono, codigo } = req.body;
    const newCorp = await Model.create({
      nombre,
      razon_social,
      nit,
      telefono,
      codigo,
    });
    res.status(200).send({ ...newCorp, message: "corp created succesfully" });
  } catch (error) {
    res.send(error);
  }
});
