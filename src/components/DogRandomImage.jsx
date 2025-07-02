import React, { useState } from "react";

export default function DogRandomImage() {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchDog = async () => {
    setLoading(true);
    setImage("");
    try {
      const res = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await res.json();
      setImage(data.message);
    } catch (e) {
      alert("No se cargo la imagen");
    }
    setLoading(false);
  };

  return (
    <div>
      <button onClick={fetchDog} className="dog-btn">
        Cambiame
      </button>
      {loading && <p>Cargando...</p>}
      {image && (
        <div>
          <img src={image} alt="Perro aleatorio" className="dog.-img" />
        </div>
      )}
    </div>
  );
}