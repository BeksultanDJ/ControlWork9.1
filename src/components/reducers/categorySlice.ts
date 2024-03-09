import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import categories from "../Categories.tsx";

interface Category {
    name: string;
    type: string;
    id: string;
}

export const sendCategoryData = createAsyncThunk(
    'categories/sendCategoryData',
    async (categoryData: Category, { rejectWithValue }) => {
        try {
            const response = await axios.post('https://testapi2-bf456-default-rtdb.asia-southeast1.firebasedatabase.app/categories.json', categoryData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getCategory = createAsyncThunk(
    'categories/getCategory',
    async () => {
        try {
            const response = await axios.get('https://testapi2-bf456-default-rtdb.asia-southeast1.firebasedatabase.app/categories.json');
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch categories');
        }
    }
);

export const deleteCategoryData = createAsyncThunk(
    'categories/deleteCategorieData',
    async (id: string, { rejectWithValue }) => {
        try {
            await axios.delete(`https://testapi2-bf456-default-rtdb.asia-southeast1.firebasedatabase.app/categories/${id}.json`);
            return id;
        } catch (error) {
            console.error('Error deleting category:', error);
            return rejectWithValue((error as Error).message);
        }
    }
);

interface CategoryState {
    categories: Category[];
}

const initialCategoryState: CategoryState = {
    categories: [],
};

const categorySlice = createSlice({
    name: 'categories',
    initialState: initialCategoryState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCategory.fulfilled, (state, action) => {
            state.categories = Object.values(action.payload);
        });
        builder.addCase(deleteCategoryData.fulfilled, (state, action) => {
            state.categories = state.categories.filter(category => category.id !== action.payload);
        });
    },
});

export const categoryActions = categorySlice.actions;
export default categorySlice.reducer;
