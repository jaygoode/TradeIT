import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../redux/store';

import { Product } from '../types/product';
import { useState, useEffect } from 'react';

// Use throughout your app instead of plain `useDispatch` and `useSelector`

const useProduct = (productId:string|undefined) => {
    const [product, setProduct] = useState<Product | undefined>(undefined);
    useEffect(() => {
        if(productId) {
        fetch(`https://api.escuelajs.co/api/v1/products/${productId}`)
            .then((data) => data.json())
            .then((data) => setProduct(data))};
    }, [productId]);
    return product
}

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useProduct