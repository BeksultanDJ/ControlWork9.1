import { createAsyncThunk } from '@reduxjs/toolkit';

export const sendTransactionData = createAsyncThunk(
    'transactions/sendTransactionData',
    async (transactionData, { rejectWithValue }) => {
        try {
            const response = await fetch('https://testapi2-bf456-default-rtdb.asia-southeast1.firebasedatabase.app/transactions.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(transactionData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Transaction added:', data);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

