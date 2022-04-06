import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

export const Popup = ({ open, setOpen, selected, filterValue }) => {
  const [disabled, setDisabled] = useState(true);

  const [state, setState] = useState({
    nombre: "",
    razon_social: "",
    nit: "",
    telefono: "",
    codigo: "",
  });

  useEffect(() => {
    setState({
      ...state,
      [selected]: filterValue,
    });
  }, [filterValue, selected]);

  useEffect(() => {
    validate();
  }, [state]);

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await (
      await axios.post("http://localhost:3001/empresas", state)
    ).data;
    alert(response.message);
    setState({
      nombre: "",
      razon_social: "",
      nit: "",
      telefono: "",
      codigo: "",
    });
    setOpen(false);
  };

  const validate = () => {
    if (
      !state.nombre ||
      !state.razon_social ||
      !state.nit ||
      !state.telefono ||
      !state.codigo
    )
      setDisabled(true);
    else setDisabled(false);
  };

  return (
    <Modal isOpen={open}>
      <ModalHeader>Agregar nueva empresa</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label>Ingresa el nombre de la nueva empresa</Label>
          <Input
            name="nombre"
            type="text"
            value={state.nombre}
            onChange={(e) => handleChange(e)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Ingresa que razon social tiene</Label>
          <Input
            name="razon_social"
            type="text"
            value={state.razon_social}
            onChange={(e) => handleChange(e)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Ingresa el NIT</Label>
          <Input
            name="nit"
            type="text"
            value={state.nit}
            onChange={(e) => handleChange(e)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Ingresa el telefono de la empresa</Label>
          <Input
            name="telefono"
            type="text"
            value={state.telefono}
            onChange={(e) => handleChange(e)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Ingresa el codigo de la empresa</Label>
          <Input
            name="codigo"
            type="text"
            value={state.codigo}
            onChange={(e) => handleChange(e)}
          />
        </FormGroup>
        <Button
          type="submit"
          onClick={(e) => handleSubmit(e)}
          disabled={disabled}
          color="success"
        >
          Agregar empresa
        </Button>
      </ModalBody>
      <ModalFooter>
        <Button onClick={() => setOpen(false)}>Close</Button>
      </ModalFooter>
    </Modal>
  );
};
