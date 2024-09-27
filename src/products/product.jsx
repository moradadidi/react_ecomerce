import { useState } from "react";

export default function Product({ initialProduct  }) {
    const [products, setProducts] = useState(initialProduct);
    const [newName, setNewName] = useState("");
    const [newPrice, setNewPrice] = useState("");
    const [newQuantity, setNewQuantity] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const[idToUpdate,setidToUpdate]=useState(null)


    const addProduct = (e) => {
        e.preventDefault();
        if (!newName || !newPrice || !newQuantity || !newDescription) {
            alert("All the fields have to be filled");
            return;
        }

        const newProduct = {
            name: newName,
            price: newPrice,
            quantity: newQuantity,
            description: newDescription,
        };

        setProducts([...products, newProduct]);

        setNewName("");
        setNewPrice("");
        setNewQuantity("");
        setNewDescription("");

        alert(`${newName} added successfully!`);
    };

    const deleteProduct=(deleteId)=>{
        alert(`${products[deleteId].name} delted successfully!`);
        setProducts(products.filter((_,id)=>id !==deleteId))
        
    }

    const editProduct = (idToEdit)=>{
        setidToUpdate(idToEdit)
        const selectd_product = products[idToEdit]
        setNewName(selectd_product.name);
        setNewPrice(selectd_product.price);
        setNewQuantity(selectd_product.quantity);
        setNewDescription(selectd_product.description);
    }

    const updateProduct =(e)=>{
        e.preventDefault();
        if(idToUpdate!==null){
        const updatedproducts = [...products]
        updatedproducts[idToUpdate]={
            name: newName,
            price: newPrice,
            quantity: newQuantity,
            description: newDescription,
        }

        setProducts(updatedproducts)

        setNewName("");
        setNewPrice("");
        setNewQuantity("");
        setNewDescription("");

        setidToUpdate(null)

        alert(`${newName} updated successfully!`);
    }
    }

    const displayProducts = () => {
        return products.map((product, id) => (
            <tr key={id}>
                <td>{id + 1}</td>
                <td>{product.name}</td>
                <td>{product.price} DH</td>
                <td>{product.quantity} Piece</td>
                <td>{product.description}</td>
                <td><button onClick={()=>deleteProduct(id)}>delete </button></td>
                <td><button onClick={()=>editProduct(id)}>Edit</button></td>
            </tr>
        ));
    };

    return (
        <>
            <h2>Product CRUD</h2>
            <form onSubmit={idToUpdate === null ? addProduct : updateProduct}>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    placeholder="Name of the product"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                />
                <label htmlFor="price">Price</label>
                <input
                    type="number"
                    placeholder="Price"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                />
                <label htmlFor="quantity">Quantity</label>
                <input
                    type="number"
                    placeholder="Quantity"
                    value={newQuantity}
                    onChange={(e) => setNewQuantity(e.target.value)}
                />
                <label htmlFor="description">Description</label>
                <input
                    type="text"
                    placeholder="Description"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                />
                <button type="submit">{idToUpdate === null ? "Add Product" : "Update Product" }</button>
            </form>
            <br /><br />
            <table>
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Description</th>
                        <th>delete</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {displayProducts()}
                </tbody>
            </table>
        </>
    );
}
