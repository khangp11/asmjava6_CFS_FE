import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const FoodComponent = () => {
    const [ListFood, setListFood] = useState([]);
    const [ListCategory, setListCategory] = useState([]);
    const [Food, setFood] = useState({});
    const [FoodID, setFoodID] = useState(null);
    const [image, setImage] = useState("");
    const [UrlImage, setUrlImage] = useState("");


    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`http://localhost:8080/api/food`);
                setListFood(response.data || {});

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, [Food]);

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
    }, []);

    const newData = {
        id: Food.id,
        food_name: Food.food_name,
        quantity: Food.quantity,
        description: Food.description,
        price: Food.price,
        star: Food.star,
        image: Food.image,
        category: Food.category,
        discount: Food.discount
    }
    const uploadImage = () => {
        // Wrap the asynchronous logic in a Promise
        return new Promise(async (resolve, reject) => {
            try {
                const data = new FormData();
                data.append("file", image);
                data.append("upload_preset", "tw6m2jde");
                data.append("cloud_name", "dlxwm5pax");

                // Use fetch to upload the image
                const response = await fetch(
                    `https://api.cloudinary.com/v1_1/dlxwm5pax/upload`,
                    {
                        method: "POST",
                        body: data,
                    }
                );

                // Parse the response as JSON
                const res = await response.json();

                // Log the Cloudinary response
                console.log("Cloudinary Response:", res.public_id);

                // Update the state with the image URL
                setUrlImage(res.public_id);

                // Resolve the Promise with the image URL
                resolve(res.public_id);
            } catch (error) {
                // Handle errors by rejecting the Promise with the error
                console.error("Error uploading image:", error.message);
                reject(error);
            }
        });
    };

    const onUpdate = async () => {
        try {
            // Await the result of uploadImage
            const uploadedImageUrl = await uploadImage();

            // Log the updated URL
            console.log("update url", uploadedImageUrl);

            // Use the uploaded image URL in the axios.put request
            await axios.put(`http://localhost:8080/api/update/food/${FoodID}`, { ...newData, image: uploadedImageUrl });

            // Log the update data
            console.log("update", newData);

            // Show success toast and reset the form
            toast.success("Update Success !");
            onReset();
        } catch (error) {
            // Handle errors during the update process
            console.error("Error during update:", error.message);
            toast.error("Update failed. Please try again.");
        }
    };
    const onCreate = async () => {
        try {
            // Await the result of uploadImage
            const uploadedImageUrl = await uploadImage();

            // Log the updated URL
            console.log("create url", uploadedImageUrl);
            await axios.post(`http://localhost:8080/api/create/food`, { ...newData, image: uploadedImageUrl });
            console.log("create", newData)
            toast.success("Create Success !")
            onReset()
        } catch (error) {
            // Handle errors during the update process
            console.error("Error during update:", error.message);
            toast.error("create failed. Please try again.");
        }
    }

    const onclickEdit = async (id) => {
        setFoodID(id);
        const response = await axios.get(`http://localhost:8080/api/food/${id}`);
        setFood(response.data)

    }

    const onDelete = async (id) => {
        if (id != null) {
            await axios.delete(`http://localhost:8080/api/delete/food/${id}`);
            onReset()
            toast.success("Delete Success !")
        } else {
            await axios.delete(`http://localhost:8080/api/delete/food/${FoodID}`);
            onReset()
            toast.success("Delete Success !")
        }
    }
    const onReset = () => {
        const response = {
            id: '',
            food_name: '',
            quantity: '',
            description: '',
            price: '',
            star: '',
            image: '',
            category_id: '',
            discount: ''
        }
        setFood(response);
    }

    return (
        <>

            <div>
                <form>
                    <div class="card-body col-md-4">
                        <div>
                            <input style={{ display: 'none' }} id="id" name="id" value={Food.id} onChange={(e) => setFood({ ...Food, id: e.target.value })} required />
                        </div>
                        <div class="form-group">
                            <label for="foodname">Food Name:</label>
                            <input class="form-control" type="text" id="food_name" name="food_name" value={Food.food_name} onChange={(e) => setFood({ ...Food, food_name: e.target.value })} required />
                        </div>
                        <div class="form-group">
                            <label for="quantity">Quantity:</label>
                            <input class="form-control" type="number" id="quantity" name="quantity" value={Food.quantity} onChange={(e) => setFood({ ...Food, quantity: e.target.value })} required />
                        </div>
                        <div class="form-group">
                            <label for="description">Description:</label>
                            <textarea class="form-control" id="description" name="description" value={Food.description} onChange={(e) => setFood({ ...Food, description: e.target.value })} required></textarea>
                        </div>
                        <div class="form-group">
                            <label for="price">Price:</label>
                            <input class="form-control" type="number" step="0.01" id="price" name="price" value={Food.price} onChange={(e) => setFood({ ...Food, price: e.target.value })} required />
                        </div>
                        <div class="form-group">
                            <label for="star">Star Rating:</label>
                            <input class="form-control" type="number" id="star" name="star" min="1" max="5" value={Food.star} onChange={(e) => setFood({ ...Food, star: e.target.value })} required />
                        </div>
                        <div class="form-group">
                            <label for="exampleInputFile">File input</label>
                            <div class="input-group">
                                <div class="custom-file">
                                    <input type="file" onChange={(e) => setImage(e.target.files[0])} class="custom-file-input" id="exampleInputFile" />
                                    <label class="custom-file-label" for="exampleInputFile">Choose file</label>
                                </div>
                                <div class="input-group-append">
                                    <span class="input-group-text">Upload</span>
                                </div>
                            </div>
                        </div>
                        <div>

                            <div>
                                <img src={`http://res.cloudinary.com/dlxwm5pax/image/upload/v1700937458/${Food.image}.jpg`} alt="Image" />

                            </div>
                        </div>
                        <div class="form-group">
                            <label htmlFor="category">Category:</label>
                            <select class="form-control"
                                value={Food.category === undefined ? ListCategory.id : Food.category.id}
                                onChange={(e) => {
                                    const categoryId = parseInt(e.target.value);
                                    const newCate = ListCategory.find(item => item.id === categoryId);
                                    setFood({ ...Food, category: newCate })
                                    console.log(newCate)
                                }}
                            >
                                {ListCategory.map((categoryOption) => (
                                    <option key={categoryOption.id} value={categoryOption.id}>
                                        {categoryOption.name_category}
                                    </option>
                                ))}
                            </select>
                        </div >
                        <div class="form-group">
                            <label for="discount">Discount:</label>
                            <input class="form-control" type="number" step="0.1" min="0" id="discount" name="discount" value={Food.discount} onChange={(e) => setFood({ ...Food, discount: e.target.value })} required />
                        </div>

                    </div>
                </form >
            </div >
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
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Description</th>
                                <th>Star</th>
                                <th>Image</th>
                                <th>Category</th>
                                <th>discount</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody className="tbody-style">
                            {ListFood.map((food, index) => {
                                return (
                                    <tr key={food.id}>
                                        <th>{index + 1}</th>
                                        <th>{food.food_name}</th>
                                        <th>{food.quantity}</th>
                                        <th>{food.description}</th>
                                        <th>{food.star}</th>
                                        <th>{food.image}</th>
                                        <th>{food.category.id}</th>
                                        <th>{food.discount}</th>
                                        <th class="card-footer">
                                            <button type="submit" class="btn btn-success" onClick={() => onclickEdit(food.id)}>Edit</button>
                                            <button type="submit" class="btn btn-success" onClick={() => onDelete(food.id)}>Delete</button>
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
export default FoodComponent;