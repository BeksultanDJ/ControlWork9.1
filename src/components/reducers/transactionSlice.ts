import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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


export const getTransactions = createAsyncThunk(
    'transactions/getTransactions',
    async () => {
        try {
            const response = await fetch('https://testapi2-bf456-default-rtdb.asia-southeast1.firebasedatabase.app/transactions.json');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error('Failed to fetch transactions');
        }
    }
);

export const deleteTransactionData = createAsyncThunk(
    'transactions/deleteTransactionData',
    async (transactionId: string, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://testapi2-bf456-default-rtdb.asia-southeast1.firebasedatabase.app/transactions/${transactionId}.json`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return transactionId;
        } catch (error) {
            return rejectWithValue(error.message);
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
        setFormData(state, action) {
            state.formData = action.payload;
        },
        clearFormData(state) {
            state.formData = initialState.formData;
        },
        deleteTransaction(state, action) {
            state.transactions = state.transactions.filter(transaction => transaction.id !== action.payload);
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

export const { setFormData, clearFormData, deleteTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
