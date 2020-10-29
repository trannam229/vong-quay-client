import MainLayout from '@layouts/main';
import { useEffect } from 'react';
import axios from '../../configs/api-request';

export default function Example() {
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get("/price-board");
            console.log(data);
        }

        fetchData();
    }, []);

    return (
        <MainLayout>
            FAQ
        </MainLayout>
    )
}
