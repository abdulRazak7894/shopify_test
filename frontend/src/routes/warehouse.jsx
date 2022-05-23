import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Warehouse() {
    const { url, path } = useRouteMatch();
    return (
        <main style={{ padding: "1rem 0" }}>
            <h2>Warehouse</h2>

            <nav
                style={{
                    borderBottom: "solid 1px",
                    paddingBottom: "1rem",
                }}
            >
<Link to={`${url}/list`}>List</Link> |{" "}
                <Link to={`${url}/create`}>Create</Link> 
                
                
            </nav>
            <Switch>
                
            <Route path={`${path}/list`}>
                    <ListWarehouse />
                </Route>
                <Route path={`${path}/create`}>
                    <CreateWarehouse />
                </Route>
            </Switch>
        </main>
    );
}

export function ListWarehouse() {
    let [warehouse, setWarehouse] = useState();
    let [selectedWarehouse, setSelectedWarehouse] = useState();

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

    let handleDelete = async (id) => {
        await axios.delete(`/api/warehouse/${id}`).then(() => {
            setWarehouse({...warehouse, rows: warehouse?.rows?.filter(item => item._id != id)});
            alert("Warehouse Deleted");
        }).catch(error => {
            alert(error.message ?? "Something went wrong");
        })
    }

    let handleEdit = (item) => {
        setSelectedWarehouse(item);
    }

    return (
        <>
        {selectedWarehouse ? <EditWarehouse warehouse={selectedWarehouse} setSelectedWarehouse={setSelectedWarehouse} getWarehouse={getWarehouse}/> :
        <div style={{ marginTop: "50px" }}>
            <div>
                <h3>Warehouse List!</h3>
            </div>
            
            <table>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Country</th> 
                    <th>Action</th>                
                </tr>
                {warehouse?.rows?.map((item, index) => (
                    <tr key={index}>
                        <td>{item?.name}</td>
                        <td>{item?.address_line}</td>
                        <td>{item?.country}</td>
                        <td><button onClick={() => handleEdit(item)}>Edit</button><button onClick={() => handleDelete(item?._id)}>Delete</button></td>
                    </tr>
                ))}
                
            </table>
        </div>
        }
        </>
    );
}

export function CreateWarehouse() {
    
    let [warehouse, setWarehouse] = useState({});
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setWarehouse({...warehouse, [name]: value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        await axios.post("/api/warehouse/create", warehouse).then(() => {
            alert("Warehouse added")
        }).catch(error => {
            alert(error?.message ?? "Something went wrong");
        })
    }
    return (
        <div style={{ marginTop: "50px", width: "20%" }}>
            <div id="user_id">
                <h3>Add Warehouse</h3>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Name: </label>
                    <input type="text" name="name" onChange={handleChange} required />
                </div>
                <div className="input-container">
                    <label>Address: </label>
                    <input type="text" name="address_line" onChange={handleChange} required />
                </div>
                <div className="input-container">
                    <label>City: </label>
                    <input type="text" name="city" onChange={handleChange} required />
                </div>
                <div className="input-container">
                    <label>Zip Code: </label>
                    <input type="text" name="zipcode" onChange={handleChange} required />
                </div>
                <div className="input-container">
                    <label>Country: </label>
                    <input type="text" name="country" onChange={handleChange} required />
                </div>
                
                <div className="input-container">
                    <input id="signup-submit" type="submit" value="Add" />
                </div>
               
            </form>
        </div>
    );
}

export function EditWarehouse(props) {
    
    let [warehouse, setWarehouse] = useState(props.warehouse);
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setWarehouse({...warehouse, [name]: value})
    }

    const updateWarehouse = async () => {
        await axios.put(`/api/warehouse/${warehouse?._id}`, warehouse).then((response) => {
            alert("Successfully Updated");
            props?.getWarehouse();
            props?.setSelectedWarehouse();
        }).catch(error => {
            alert(error?.message ?? "Something went wrong");
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        updateWarehouse()
    }

    return (
        <div style={{ marginTop: "50px", width: "20%" }}>
            <div id="user_id">
                <h3>Add Warehouse</h3>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Name: </label>
                    <input type="text" name="name" defaultValue={warehouse?.name} onChange={handleChange} required />
                </div>
                <div className="input-container">
                    <label>Address: </label>
                    <input type="text" name="address_line" defaultValue={warehouse?.address_line} onChange={handleChange} required />
                </div>
                <div className="input-container">
                    <label>City: </label>
                    <input type="text" name="city" defaultValue={warehouse?.city} onChange={handleChange} required />
                </div>
                <div className="input-container">
                    <label>Zip Code: </label>
                    <input type="text" name="zipcode" defaultValue={warehouse?.zipcode} onChange={handleChange} required />
                </div>
                <div className="input-container">
                    <label>Country: </label>
                    <input type="text" name="country" defaultValue={warehouse?.country} onChange={handleChange} required />
                </div>
                
                <div className="input-container">
                    <input id="signup-submit" type="submit" value="Update" />
                </div>
               
            </form>
        </div>
    );
}
