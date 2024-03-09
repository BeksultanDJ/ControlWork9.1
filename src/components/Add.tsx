import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearFormData } from './reducers/transactionSlice';
import { sendTransactionData } from './reducers/transactionActions';
import { getCategory } from './reducers/categorySlice';
import { v4 as uuidv4 } from 'uuid';

const AddExIn = ({ handleCloseForm }) => {
    const dispatch = useDispatch();
    const [localFormData, setLocalFormData] = useState({
        id: '',
        type: '',
        category: '',
        amount: '',
    });
    const categories = useSelector((state) => state.categories.categories);

    useEffect(() => {
        dispatch(getCategory());
    }, [dispatch]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLocalFormData({ ...localFormData, [name]: value });
    };

    const handleCancel = () => {
        handleCloseForm();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let amount = parseFloat(localFormData.amount);
        if (localFormData.type === 'expense') {
            amount = -Math.abs(amount);
        }
        const transactionData = {
            id: uuidv4(),
            category: localFormData.category,
            amount: amount,
            createdAt: new Date().toISOString(),
        };
        dispatch(sendTransactionData(transactionData));
        dispatch(clearFormData());
        handleCloseForm();
    };

    return (
        <div className="modal">
            <form className="FormAdd" onSubmit={handleSubmit}>
                <select name="type" onChange={handleChange}>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
                <select name="category" onChange={handleChange}>
                    <option value="">Category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.name}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    name="amount"
                    placeholder="Enter sum"
                    value={localFormData.amount}
                    onChange={handleChange}
                />
                <button type="submit">Submit</button>
                <button type="button" onClick={handleCancel}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default AddExIn;
