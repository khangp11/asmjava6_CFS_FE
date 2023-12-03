import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const CategoryComponent = () => {
    const [ListCategory, setListCategory] = useState([]);
    const [CategoryID, setCategoryID] = useState(null);
    const [CategoryInput, setCategoryInput] = useState({});

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`http://localhost:8080/api/category`);
                setListCategory(response.data || {});
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, [CategoryInput]);
    const newData = {
        id: CategoryInput.id,
        name_category: CategoryInput.name_category
    }
    const onclickEdit = async (id) => {
        setCategoryID(id);
        const response = await axios.get(`http://localhost:8080/api/category/${id}`);
        setCategoryInput(response.data)

    }
    const onCreate = async () => {
        await axios.post(`http://localhost:8080/api/create/category`, newData);
        onReset()
        toast.success("Create Success !")
    }
    const onUpdate = async () => {
        await axios.put(`http://localhost:8080/api/update/category/${CategoryID}`, newData);
        onReset()
        toast.success("Update Success !")
    }
    const onDelete = async (id) => {
        if (id != null) {
            await axios.delete(`http://localhost:8080/api/delete/category/${id}`);
            onReset()
            toast.success("Delete Success !")
        } else {
            await axios.delete(`http://localhost:8080/api/delete/category/${CategoryID}`);
            onReset()
            toast.success("Delete Success !")
        }
    }
    const onReset = () => {
        const response = {
            id: '',
            name_category: '',
        }
        setCategoryInput(response);
    }
    return (
        <>
            <form>
                <div class="card-body col-md-4">
                    <div class="form-group">
                        <label for="combo_for_one">ID:</label>
                        <input class="form-control" type="text" id="id" name="id" value={CategoryInput.id} onChange={(e) => setCategoryInput({ ...CategoryInput, id: e.target.value })} disabled={true} />
                    </div>
                    <div class="form-group">
                        <label for="combo_sharing">Category</label>
                        <input class="form-control" type="text" id="category" name="category" value={CategoryInput.name_category} onChange={(e) => setCategoryInput({ ...CategoryInput, name_category: e.target.value })} />
                    </div>
                </div>
            </form>
            <div class="card-footer">
                <button type="submit" class="btn btn-success" onClick={() => onCreate()}>Create</button>
                <button type="submit" class="btn btn-success" onClick={() => onUpdate()}>Update</button>
                <button type="submit" class="btn btn-success" onClick={() => onDelete()}>Delete</button>
                <button type="submit" class="btn btn-success" onClick={() => onReset()}>Reset</button>
            </div>

            <div class="card">
                <div class="card-body">
                    <table class="table table-bordered">
                        <thead className="thead-style">
                            <tr>
                                <th>Index</th>
                                <th>Category</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="tbody-style">
                            {ListCategory.map((category, index) => {
                                return (
                                    <tr key={category.id}>
                                        <th>{index + 1}</th>
                                        <th>{category.name_category}</th>
                                        <th className='col-md-2'>
                                            <button type="submit" className="btn btn-success" onClick={() => onclickEdit(category.id)}>Edit</button>
                                            <button type="submit" className="btn btn-success" onClick={() => onDelete(category.id)}>Delete</button>
                                        </th>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>

    )
}

export default CategoryComponent