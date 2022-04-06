import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import { Popup } from "./Popup";
import InfiniteScroll from "react-infinite-scroll-component";

export const SearchBar = () => {
  const [info, setInfo] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [dropdown, setDropDown] = useState(false);
  const [selected, setSelected] = useState("codigo");
  const [open, setOpen] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 20;
  let indexOfLastCorp = currentPage * perPage;
  let currentCorps = filtered.slice(1, indexOfLastCorp);

  const paged = (n) => {
    setCurrentPage(n);
  };

  useEffect(() => {
    getInfo();
  }, []);

  useEffect(() => {
    setSelected("codigo");
  }, [dropdown]);

  const getInfo = async () => {
    let api = (await axios.get("http://localhost:3001/empresas")).data;
    setInfo(api);
    setFiltered(api);
  };

  const openClose = () => {
    setDropDown(!dropdown);
  };

  const handleChange = (e) => {
    setFilterValue(e.target.value);
    if (e.target.value) {
      setFiltered(
        filtered.filter((r) => {
          return r[selected]
            .toLowerCase()
            .includes(e.target.value?.toLowerCase());
        })
      );
    } else setFiltered(info);
  };

  const handleSelect = (e) => {
    setSelected(e.target.value?.toLowerCase());
  };

  return (
    <div className="search-bar-dropdown">
      <Dropdown
        isOpen={dropdown}
        toggle={openClose}
        size="lg"
        className="drop-down"
      >
        <DropdownToggle caret>Dropdown</DropdownToggle>
        <DropdownMenu className="drop-down-menu">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text" for="inputGroupSelect01">
                Options
              </label>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Filter..."
              onChange={(e) => handleChange(e)}
            ></input>
            <select className="custom-select" onChange={(e) => handleSelect(e)}>
              <option value="codigo">Codigo</option>
              <option value="razon_social">Razon social</option>
              <option value="nombre">Nombre</option>
              <option value="nit">NIT</option>
              <option value="telefono">Telefono</option>
            </select>
          </div>
          <ul className="list-group">
            <button
              onClick={() => setOpen(true)}
              type="button"
              className="btn btn-primary"
            >
              Add corp
            </button>
            <InfiniteScroll
              dataLength={filtered.length}
              next={() => paged(currentPage + 1)}
              hasMore={true}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
              className="infinite-scroll"
            >
              {filtered.map((e) => (
                <button
                  type="button"
                  key={e.id}
                  className="list-group-item list-group-item-action"
                >
                  {e.codigo} | {e.razon_social} | {e.nombre} | {e.nit} |{" "}
                  {e.telefono}
                </button>
              ))}
            </InfiniteScroll>
          </ul>
        </DropdownMenu>
      </Dropdown>
      <Popup
        open={open}
        setOpen={setOpen}
        selected={selected}
        filterValue={filterValue}
      />
    </div>
  );
};
