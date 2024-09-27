import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Car({ initialCars = [] }) {
  const [cars, setCars] = useState(initialCars || []);
  const [newLabel, setNewLabel] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newColor, setNewColor] = useState("");
  const [newStatue, setNewStatue] = useState("");
  const [idToEdit, setidToEdit] = useState(null);
  const [searchCar, setsearchCar] = useState("");

  const addCar = (e) => {
    e.preventDefault();
    if (!newLabel || !newPrice || !newColor || !newStatue) {
      toast.error("All fields have to be filled!");
      return;
    }

    const newCar = {
      label: newLabel,
      price: newPrice,
      color: newColor,
      statue: newStatue,
    };

    setCars([...cars, newCar]);

    setNewLabel("");
    setNewPrice("");
    setNewColor("");
    setNewStatue("");

    toast.success(`${newLabel} added successfully!`);
  };

  const deleteCar = (idToRemove) => {
    toast.error(`${cars[idToRemove].label} deleted successfully!`);
    setCars(cars.filter((_, id) => id !== idToRemove));
  };

  const editCar = (id) => {
    const car = cars[id];
    setNewLabel(car.label);
    setNewPrice(car.price);
    setNewColor(car.color);
    setNewStatue(car.statue);

    setidToEdit(id);
  };

  const updateCar = (e) => {
    e.preventDefault();
    if (idToEdit !== null) {
      const updatedCars = [...cars];
      updatedCars[idToEdit] = {
        label: newLabel,
        price: newPrice,
        color: newColor,
        statue: newStatue,
      };

      setCars(updatedCars);

      setNewLabel("");
      setNewPrice("");
      setNewColor("");
      setNewStatue("");
      setidToEdit(null);

      toast.success(`${newLabel} updated successfully!`);
    }
  };

  const searchcar = () => {
    if (searchCar) {
      return cars.filter((car) =>
        car.label.toLowerCase().includes(searchCar.toLowerCase())
      );
    }
    return cars;
  };

  const displayCars = () => {
    const filteredCars = searchcar();
    return filteredCars.map((car, id) => (
      <tr key={id}>
        <td>{id + 1}</td>
        <td>{car.label} </td>
        <td>{car.price} </td>
        <td>{car.color} </td>
        <td>{car.statue} </td>
        <td>
          <button onClick={() => deleteCar(id)}>Delete</button>
        </td>
        <td>
          <button onClick={() => editCar(id)}>Edit</button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <ToastContainer />
      <h2 className="">Car CRUD</h2>
      <br />
      <form>
        <input
          type="text"
          placeholder="Search a car"
          value={searchCar}
          onChange={(e) => setsearchCar(e.target.value)}
        />
      </form>
      <br />
      <form onSubmit={idToEdit === null ? addCar : updateCar}>
        <label htmlFor="label">Label</label>
        <input
          type="text"
          placeholder="Label of the car"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
        />
        <label htmlFor="price">Price</label>
        <input
          type="number"
          placeholder="Price"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
        />
        <label htmlFor="color">Color</label>
        <input
          type="text"
          placeholder="Color"
          value={newColor}
          onChange={(e) => setNewColor(e.target.value)}
        />
        <label htmlFor="statue">Statue</label>
        <input
          type="text"
          placeholder="Statue"
          value={newStatue}
          onChange={(e) => setNewStatue(e.target.value)}
        />
        <button type="submit">
          {idToEdit === null ? "Add Car" : "Update Car"}
        </button>
      </form>
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>Car ID</th>
            <th>Car Label</th>
            <th>Price</th>
            <th>Color</th>
            <th>Statue</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>{displayCars()}</tbody>
      </table>
    </>
  );
}
