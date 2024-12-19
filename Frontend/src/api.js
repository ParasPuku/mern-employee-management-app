const BASE_URL = 'http://localhost:8080'
export const getAllEmployees = async (search = "", page = 1, limit = 5) => {
    const url = `${BASE_URL}/api/v1/employee/getAllEmployees/?search=${search}&page=${page}&limit=${limit}`
    try {
        const options = {
            method: `GET`,
            'content-type': 'application/json',
        }
        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    } catch (error) {
        console.log('An error occurred while fetching employees', error);
    }
}

export const createEmployee = async (empObj) => {
    const url = `${BASE_URL}/api/v1/employee/createEmployee`
    try {
        const formData = new FormData();
        for(const key in empObj) {
            formData.append(key, empObj[key]);
        }
        const options = {
            method: `POST`,
            'content-type': 'application/json',
            body: formData
        }
        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    } catch (error) {
        console.log('An error occurred while fetching employees', error);
    }
}

export const updateEmployeeById = async (empObj, id) => {
    const url = `${BASE_URL}/api/v1/employee/updateEmployeeById/${id}`
    try {
        const formData = new FormData();
        for(const key in empObj) {
            formData.append(key, empObj[key]);
        }
        const options = {
            method: `PUT`,
            'content-type': 'application/json',
            body: formData
        }
        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    } catch (error) {
        console.log('An error occurred while fetching employees', error);
    }
}

export const deleteEmployeeById = async (id) => {
    const url = `${BASE_URL}/api/v1/employee/deleteEmployeeById/${id}`
    try {
        const options = {
            method: `DELETE`,
            'content-type': 'application/json',
        }
        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    } catch (error) {
        console.log('An error occurred while fetching employees', error);
    }
}

export const getEmployeeById = async (id) => {
    const url = `${BASE_URL}/api/v1/employee/getEmployeeById/${id}`
    try {
        const options = {
            method: `GET`,
            'content-type': 'application/json',
        }
        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    } catch (error) {
        console.log('An error occurred while fetching employees', error);
    }
}