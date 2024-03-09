// Пример подключения в вашем Redux Store
import { configureStore } from '@reduxjs/toolkit';
import transactionReducer from './transactionSlice';
import categoryReducer from "./categorySlice";

export const store = configureStore({
    reducer: {
        transactions: transactionReducer,
        categories: categoryReducer,
    },
});

export default store;
