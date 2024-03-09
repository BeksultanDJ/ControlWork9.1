import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendCategoryData, getCategory, deleteCategoryData } from './reducers/categorySlice';
import { NavLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Categories = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state: any) => state.categories.categories);
    const [formData, setFormData] = useState({
        id: '',
        type: '',
        name: '',
    });

    useEffect(() => {
        dispatch(getCategory());
    }, [dispatch]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDelete = (categoryId: string) => {
        dispatch(deleteCategoryData(categoryId));
        console.log('Deleting category with ID:', categoryId);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newCategory = {
            id: uuidv4(),
            type: formData.type,
            name: formData.name,
        };

        dispatch(sendCategoryData(newCategory))
            .then(() => {
                setFormData({
                    id: '',
                    type: '',
                    name: '',
                });
            })
            .catch((error: any) => {
                console.error('Error sending data:', error);
            });
    };

    return (
        <div>
            <header>
                <div className="container">
                    <h2>Finance Tracker</h2>
                    <div className="Links">
                        <NavLink to="/">
                            <strong>Finance List</strong>
                        </NavLink>
                        <strong>Add</strong>
                    </div>
                </div>
            </header>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter category name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <button type="submit">Submit</button>
            </form>
            <div className="cardsContainer">
                {Array.isArray(categories) && categories.length > 0 ? (
                    categories.map((category: any, index: number) => (
                        <div className="card" key={index}>
                            <div className="cardsInfoCategories">
                                <h3>{category.name}</h3>
                                <h3>{category.type}</h3>
                            </div>
                            <div className="btns">
                                <button>Edit</button>
                                <button onClick={() => handleDelete(category.id)}>Delete</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No categories available</p>
                )}
            </div>
        </div>
    );
};

export default Categories;
