import { useState, useEffect } from 'react';

const useGetAllDoctors = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [pageTokens, setPageTokens] = useState([]);

    const fetchDoctors = async () => {
        // Simulate API call
        const doctors = [
            {
                id: '1',
                displayName: 'Dr. Alice Johnson',
                profile: {
                    specialization: 'Cardiologist',
                    experience: 15,
                },
            },
            {
                id: '2',
                displayName: 'Dr. Robert Smith',
                profile: {
                    specialization: 'Neurologist',
                    experience: 20,
                },
            },
        ];
        setUsers(doctors);
        setHasNextPage(false); // Set to true if pagination is implemented
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    return {
        users,
        setSearch,
        search,
        setCurrentPage,
        currentPage,
        hasNextPage,
        pageTokens,
    };
};

export default useGetAllDoctors;
