import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import json from "../example.json";
import s from "./Combobox.module.css";
import axios from "axios";

export const Combobox = () => {
  const [info, setInfo] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [add, setAdd] = useState(true);
  const [selected, setSelected] = useState("nombre");

  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async () => {
    let api = (await axios.get("http://localhost:3001/empresas")).data;
    setInfo(api);
    setFiltered(api);
  };

  useEffect(() => {
    validateAdd();
  }, [filtered]);

  const validateAdd = () => {
    if (!filtered?.length) setAdd(false);
    else setAdd(true);
  };

  const handleChange = (e) => {
    if (e.target.value) {
      setFiltered(
        filtered.filter((r) =>
          r[selected].toLowerCase().includes(e.target.value?.toLowerCase())
        )
      );
    } else setFiltered(info);
  };

  const handleSelect = (e) => {
    setSelected(e.target.value?.toLowerCase());
  };

  return (
    <div className={s.container}>
      <div className={s.search}>
        <input
          className={s.input}
          type="text"
          placeholder="search"
          onChange={(e) => handleChange(e)}
        />
        <select className={s.select} onChange={handleSelect}>
          <option>Nombre</option>
          <option value="razon_social">Razon social</option>
        </select>
        <ul className={s.ul}>
          <li>
          </li>
          {filtered?.map((e) => (
            <li className={s.li} key={e.nombre}>{e.nombre}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
