import MainLayout from '@layouts/main';
import { useEffect } from 'react';
import axios from '../../configs/api-request';

export default function Example() {
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get("/deal-to-sell");
            const { data:priceBoard } = await axios.get("/price-board");
            console.log(data);
            console.log(priceBoard);
        }

        fetchData();
    }, []);

    return (
        <MainLayout>
            FAQ
        </MainLayout>
    )
}
