import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Transaction {
    createdAt: string;
    category: string;
    amount: number;
    id: string;
}


export const sendTransactionData = createAsyncThunk(
    'transactions/sendTransactionData',
    async (transactionData: Transaction, { rejectWithValue }) => {
        try {
            const response = await axios.post('https://testapi2-bf456-default-rtdb.asia-southeast1.firebasedatabase.app/transactions.json', transactionData);
            return response.data;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const getTransactions = createAsyncThunk(
    'transactions/getTransactions',
    async () => {
        try {
            const response = await axios.get('https://testapi2-bf456-default-rtdb.asia-southeast1.firebasedatabase.app/transactions.json');
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch transactions');
        }
    }
);

export const deleteTransactionData = createAsyncThunk(
    'transactions/deleteTransactionData',
    async (id: string, { rejectWithValue }) => {
        try {
            await axios.delete(`https://testapi2-bf456-default-rtdb.asia-southeast1.firebasedatabase.app/transactions/${id}.json`);
            return id;
        } catch (error) {
            console.error('Error deleting transaction:', error);
            return rejectWithValue((error as Error).message);
        }
    }
);

interface TransactionState {
    formData: {
        type: string;
        category: string;
        amount: string;
        id: string;
    };
    transactions: Transaction[];
}

const initialState: TransactionState = {
    formData: {
        type: '',
        category: '',
        amount: '',
        id: '',
    },
    transactions: [],
};

const transactionSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        clearFormData(state) {
            state.formData = initialState.formData;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTransactions.fulfilled, (state, action) => {
                state.transactions = Object.values(action.payload);
            })
            .addCase(sendTransactionData.fulfilled, (state, action) => {
                state.transactions.push(action.payload);
            })
            .addCase(deleteTransactionData.fulfilled, (state, action) => {
                state.transactions = state.transactions.filter(transaction => transaction.id !== action.payload);
            });
    },
});

export const {  clearFormData } = transactionSlice.actions;
export default transactionSlice.reducer;
