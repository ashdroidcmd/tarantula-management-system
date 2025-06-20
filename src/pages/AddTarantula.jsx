import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const initialFormState = {
  name: "",
  genus: "",
  species: "",
  origin: "",
  lifeStage: "",
  gender: "",
  mature: "",
  growthRate: "",
  temperament: "",
  venomLevel: "",
};

const AddTarantula = () => {
  const [form, setForm] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "tarantulas"), {
        ...form,
        venomLevel: parseInt(form.venomLevel),
      });
      setSuccessMsg("Tarantula added successfully!");
      setForm(initialFormState);
    } catch (error) {
      console.error("Error adding tarantula:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl p-4">
      <h2 className="mb-4 text-2xl font-bold">Add Tarantula</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="genus"
          value={form.genus}
          onChange={handleChange}
          placeholder="Genus"
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="species"
          value={form.species}
          onChange={handleChange}
          placeholder="Species"
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="origin"
          value={form.origin}
          onChange={handleChange}
          placeholder="Origin"
          className="input input-bordered w-full"
          required
        />

        <select
          name="lifeStage"
          value={form.lifeStage}
          onChange={handleChange}
          className="select select-bordered w-full"
          required
        >
          <option value="">Select Life Stage</option>
          <option value="Sling">Sling</option>
          <option value="Juvenile">Juvenile</option>
          <option value="Sub-Adult">Sub-Adult</option>
          <option value="Adult">Adult</option>
        </select>

        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="select select-bordered w-full"
          required
        >
          <option value="">Select Gender</option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
          <option value="Unknown">Unknown</option>
        </select>

        <select
          name="mature"
          value={form.mature}
          onChange={handleChange}
          className="select select-bordered w-full"
          required
        >
          <option value="">Mature?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <select
          name="growthRate"
          value={form.growthRate}
          onChange={handleChange}
          className="select select-bordered w-full"
          required
        >
          <option value="">Growth Rate</option>
          <option value="Slow">Slow</option>
          <option value="Medium">Medium</option>
          <option value="Fast">Fast</option>
        </select>

        <select
          name="temperament"
          value={form.temperament}
          onChange={handleChange}
          className="select select-bordered w-full"
          required
        >
          <option value="">Temperament</option>
          <option value="Docile">Docile</option>
          <option value="Skittish">Skittish</option>
          <option value="Aggressive">Aggressive</option>
        </select>

        <select
          name="venomLevel"
          value={form.venomLevel}
          onChange={handleChange}
          className="select select-bordered w-full"
          required
        >
          <option value="">Venom Level</option>
          <option value="1">1 - Low</option>
          <option value="2">2 - Moderate</option>
          <option value="3">3 - Strong</option>
          <option value="4">4 - High</option>
          <option value="5">5 - Dangerous</option>
        </select>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Tarantula"}
        </button>

        {successMsg && (
          <div className="alert alert-success mt-4">{successMsg}</div>
        )}
      </form>
    </div>
  );
};

export default AddTarantula;
