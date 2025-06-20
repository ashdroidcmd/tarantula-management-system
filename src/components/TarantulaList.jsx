import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

const TarantulaList = () => {
  const [tarantulas, setTarantulas] = useState([]);

  const fetchTarantulas = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "tarantulas"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTarantulas(data);
    } catch (error) {
      console.error("Error fetching tarantulas:", error);
    }
  };

  useEffect(() => {
    fetchTarantulas();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this tarantula?",
    );
    if (!confirm) return;

    try {
      await deleteDoc(doc(db, "tarantulas", id));
      setTarantulas((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error deleting tarantula:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-row justify-between">
        <h2 className="mb-4 text-2xl font-bold">Tarantula List</h2>
        <Link to="/add-tarantula" className="btn btn-primary">
          Add Tarantula
        </Link>
      </div>

      {tarantulas.length === 0 ? (
        <p>No tarantulas found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {tarantulas.map((t) => (
            <div key={t.id} className="card bg-base-100 border shadow-md">
              <div className="card-body">
                <h3 className="card-title">{t.name}</h3>
                <p>
                  <strong>Genus:</strong> {t.genus}
                </p>
                <p>
                  <strong>Species:</strong> {t.species}
                </p>
                <p>
                  <strong>Origin:</strong> {t.origin}
                </p>
                <p>
                  <strong>Life Stage:</strong> {t.lifeStage}
                </p>
                <p>
                  <strong>Gender:</strong> {t.gender}
                </p>
                <p>
                  <strong>Mature:</strong> {t.mature}
                </p>
                <p>
                  <strong>Growth Rate:</strong> {t.growthRate}
                </p>
                <p>
                  <strong>Temperament:</strong> {t.temperament}
                </p>
                <p>
                  <strong>Venom Level:</strong> {t.venomLevel}
                </p>

                <div className="mt-4">
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="btn btn-error btn-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TarantulaList;
