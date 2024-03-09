import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactions, deleteTransactionData } from './reducers/transactionSlice';
import AddExIn from './Add.tsx';
import dayjs from 'dayjs';
import { NavLink } from 'react-router-dom';

const DisplayInfo: React.FC = () => {
    const dispatch = useDispatch();
    const transactions = useSelector((state: any) => state.transactions.transactions);
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        dispatch(getTransactions());
    }, [dispatch]);

    const toggleAddForm = () => {
        setShowAddForm(!showAddForm);
    };

    const handleDelete = (transactionId: string) => {
        dispatch(deleteTransactionData(transactionId));
    };

    const handleCloseForm = () => {
        setShowAddForm(false);
    };

    return (
        <div>
            <header>
                <div className="container">
                    <h2>Finance Tracker</h2>
                    <div className="Links">
                        <NavLink to="/categories">
                            <strong>Categories</strong>
                        </NavLink>
                        <strong onClick={toggleAddForm}>Add</strong>
                    </div>
                </div>
            </header>
            <div className="cardsContainer">
                {Array.isArray(transactions) && transactions.length > 0 ? (
                    transactions.map((transaction, index) => (
                        <div className="card" key={index}>
                            <div className="cardsInfo">
                                <p>Date: {dayjs(transaction.createdAt).format('DD.MM.YYYY HH:mm:ss')}</p>
                                <p>Category: {transaction.category}</p>
                                <strong>Sum: {transaction.amount} KGZ</strong>
                            </div>
                            <div className="btns">
                                <button>Edit</button>
                                <button onClick={() => handleDelete(transaction.id)}>Delete</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No transactions available</p>
                )}
            </div>
            {showAddForm && <AddExIn handleCloseForm={handleCloseForm} />}
        </div>
    );
};

export default DisplayInfo;
