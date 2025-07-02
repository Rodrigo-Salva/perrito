import React, { useState, useEffect } from "react";
import "./App.css";

const API_BASE = "https://dog.ceo/api";

function Toast({ open, message, onClose }) {
  if (!open) return null;
  return (
    <div className="toast">
      {message}
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
}

export default function App() {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [images, setImages] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [toast, setToast] = useState({ open: false, message: "" });


  useEffect(() => {
    fetch(`${API_BASE}/breeds/list/all`)
      .then((res) => res.json())
      .then((data) => setBreeds(Object.keys(data.message)));
  }, []);


  useEffect(() => {
    if (selectedBreed) {
      fetch(`${API_BASE}/breed/${selectedBreed}/images/random/6`)
        .then((res) => res.json())
        .then((data) => setImages(data.message));
    }
  }, [selectedBreed]);

  const addFavorite = (img) => {
    if (!favorites.includes(img)) {
      setFavorites([img, ...favorites]);
      setToast({ open: true, message: "¡Agregado a favoritos!" });
    }
  };

  return (
    <div className="container">
      <h2>Galería de Razas</h2>
      <select
        value={selectedBreed}
        onChange={(e) => setSelectedBreed(e.target.value)}
      >
        <option value="">Selecciona una raza</option>
        {breeds.map((b) => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}
      </select>

      <div className="gallery">
        {images.map((img) => (
          <div key={img} className="dog-card">
            <img src={img} alt="dog" />
            <button
              className={`fav-btn ${
                favorites.includes(img) ? "fav" : ""
              }`}
              onClick={() => addFavorite(img)}
              title="Agregar a favoritos"
            >
            </button>
          </div>
        ))}
      </div>

      <Toast
        open={toast.open}
        message={toast.message}
        onClose={() => setToast({ ...toast, open: false })}
      />
    </div>
  );
}