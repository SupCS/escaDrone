import React, {useState, useEffect} from 'react';
import Axios from 'axios';

const TestPage = () => {
    const [userData, setUserData] = useState({});

    useEffect(() => {
        Axios.get('http://127.0.0.1:8000/api/')
            .then((response) => {
                setUserData(response.data);
            })
            .catch((error) => {
                console.error('Error while receiving data', error);
            });
    }, []);
    console.log(userData);

    return (
        <div>
            <ul>
                {Object.entries(userData).map(([key, value]) => (
                    <li key={key}>
                        {key}: {value}
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default TestPage;
