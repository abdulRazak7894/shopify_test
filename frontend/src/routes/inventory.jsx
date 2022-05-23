import { Link, Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Inventory() {
    const { url, path } = useRouteMatch();

    return (
        <main style={{ padding: "1rem 0" }}>
            <h2>Products</h2>

            <nav
                style={{
                    borderBottom: "solid 1px",
                    paddingBottom: "1rem",
                }}
            >
                <Link to={`${url}/list`}>List</Link> |{" "}
                <Link to={`${url}/create`}>Add Product</Link> 
            </nav>
            <Switch>
                
            <Route path={`${path}/list`}>
                <ListProducts  />
            </Route>
           
            <Route path={`${path}/create`}>
                <AddProduct />
                </Route>
            </Switch>
        </main>
    );
}

export function ListProducts() {
    let [products, setProducts] = useState([]);
    let [selectedProduct, setSelectedProduct] = useState();
   
    const getProducts = async () => {
        await axios.get("/api/products?populate=warehouse").then((response) => {
            setProducts(response?.data);
        }).catch(error => {
            alert(error?.message ?? "Something went wrong");
        })
    }

    useEffect(() => {
        getProducts();
    }, [])

    let handleDelete = async (id) => {
        await axios.delete(`/api/productss/${id}`).then(() => {
            setProducts({...products, rows: products?.rows?.filter(item => item._id != id)});
            alert("Warehouse Deleted");
        }).catch(error => {
            alert(error.message ?? "Something went wrong");
        })
    }

    let handleEdit = (item) => {
        setSelectedProduct(item);
    }

    return (
        <>
            {selectedProduct ? <EditProduct product={selectedProduct} setSelectedProduct={setSelectedProduct} getProducts={getProducts} /> :
            <div style={{ marginTop: "50px" }}>
            <div>
                <h3>Product List!</h3>
            </div>
            
            <table>
                <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>     
                    <th>Warehouse</th> 
                    <th>Action</th>                
                </tr>
                {products?.rows?.map((item, index) => (
                    <tr key={index}>
                        <td>{item?.name}</td>
                        <td>{item?.quantity}</td>
                        <td>{item?.price}</td>
                        <td>{item?.warehouse?.name}</td>
                        <td><button onClick={() => handleEdit(item)}>Edit</button><button onClick={() => handleDelete(item?._id)}>Delete</button></td>
                    </tr>
                ))}
                
            </table>
            </div>
            }
        
        </>
    );
}

export function AddProduct() {
    
    let [product, setProduct] = useState({});
    let [warehouse, setWarehouse] = useState({});

    const getWarehouse = async () => {
        await axios.get("/api/warehouse").then((response) => {
            setWarehouse(response?.data);
        }).catch(error => {
            alert(error?.message ?? "Something went wrong");
        })
    }

    useEffect(() => {
        getWarehouse();
    }, [])

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setProduct({...product, [name]: value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        await axios.post("/api/products/create", product).then(() => {
            alert("Product added")
        }).catch(error => {
            alert(error?.message ?? "Something went wrong");
        })
    }
    return (
        <div style={{ marginTop: "50px" }}>
            <div id="user_id">
                <h3>Add Product</h3>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Name: </label>
                    <input type="text" name="name" onChange={handleChange} required />
                </div>
                <div className="input-container">
                    <label>Quantity: </label>
                    <input type="number" name="quantity" onChange={handleChange} required />
                </div>
                <div className="input-container">
                    <label>Description: </label>
                    <input type="text" name="description" onChange={handleChange}/>
                </div>
                <div className="input-container">
                    <label>Price: </label>
                    <input type="number" name="price" onChange={handleChange}/>
                </div>
                <div className="input-container">
                    <label>Warehouse: </label>
                    <select name="warehouse" required onChange={handleChange}> 
                    <option value="">Select Warehouse</option>
                        {warehouse?.rows?.map((item, index) => (
                            <option value={item?._id} key={index}>{item?.name}</option>
                        ))}
                        
                    </select>
                    
                </div>
                
                <div className="input-container">
                    <input id="signup-submit" type="submit" value="Add" />
                </div>
               
            </form>
        </div>
    );
}

export function EditProduct(props) {
    
    let [product, setProduct] = useState(props?.product);
    let [warehouse, setWarehouse] = useState({});

    const getWarehouse = async () => {
        await axios.get("/api/warehouse").then((response) => {
            setWarehouse(response?.data);
        }).catch(error => {
            alert(error?.message ?? "Something went wrong");
        })
    }

    useEffect(() => {
        getWarehouse();
    }, [])

    const updateProduct = async () => {
        await axios.put(`/api/products/${product?._id}`, product).then((response) => {
            alert("Successfully Updated");
            props?.getProducts();
            props?.setSelectedProduct();
        }).catch(error => {
            alert(error?.message ?? "Something went wrong");
        })
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setProduct({...product, [name]: value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        updateProduct()
    }
    return (
        <div style={{ marginTop: "50px" }}>
            <div id="user_id">
                <h3>Edit Product</h3>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Name: </label>
                    <input type="text" name="name" defaultValue={product?.name} onChange={handleChange} required />
                </div>
                <div className="input-container">
                    <label>Quantity: </label>
                    <input type="number" name="quantity" defaultValue={product?.quantity} onChange={handleChange} required />
                </div>
                <div className="input-container">
                    <label>Description: </label>
                    <input type="text" name="description" defaultValue={product?.descriptionn} onChange={handleChange}/>
                </div>
                <div className="input-container">
                    <label>Price: </label>
                    <input type="number" name="price" defaultValue={product?.price} onChange={handleChange}/>
                </div>
                <div className="input-container">
                    <label>Warehouse: </label>
                    <select name="warehouse" required defaultValue={product?.warehouse?._id} onChange={handleChange}> 
                    <option value="">Select Warehouse</option>
                        {warehouse?.rows?.map((item, index) => (
                            <option value={item?._id} key={index}>{item?.name}</option>
                        ))}
                        
                    </select>
                    
                </div>
                
                <div className="input-container">
                    <input id="signup-submit" type="submit" value="Update" />
                </div>
               
            </form>
        </div>
    );
}
