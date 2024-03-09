import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

interface Category {
    name:string;
    type: string;
    id: string;
}
export const sendCategoryData = createAsyncThunk(
    'categories/sendCategoryData',
    async (categoryData: Category, { rejectWithValue }) => {
        try {
            const response = await fetch('https://testapi2-bf456-default-rtdb.asia-southeast1.firebasedatabase.app/categories.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(categoryData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Category added:', data);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const getCategory = createAsyncThunk(
    'categories/getCategory',
    async () => {
        try {
            const response = await fetch('https://testapi2-bf456-default-rtdb.asia-southeast1.firebasedatabase.app/categories.json');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error('Failed to fetch categories');
        }
    }
);

export const deleteCategoryData = createAsyncThunk(
    'categories/deleteCategoryData',
    async (categoryId: string, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://testapi2-bf456-default-rtdb.asia-southeast1.firebasedatabase.app/categories/${categoryId}.json`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return categoryId;
        } catch (error) {
            return rejectWithValue(error.message);
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
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getCategory.fulfilled, (state, action) => {
            state.categories = Object.values(action.payload);
        }),
            builder.addCase(deleteCategoryData.fulfilled, (state, action) => {
                console.log('Category deleted from server with ID:', action.payload);
                state.categories = state.categories.filter(category => category.id !== action.payload);
            });
    },
});


export const categoryActions = categorySlice.actions;
export default categorySlice.reducer;