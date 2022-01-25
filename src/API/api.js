import axios from "axios";

export default class Api {
    static async getAll() {
        const response = await axios.get('/api/', {
            headers: {
                "Authorization" : `${localStorage.getItem('auth')}`
            }
        })
        return response;
    }

    static async update(id, type, params) {
        const response = await axios.patch(`/api/${id}/update_${type}`,
            {},
            {
                params,
                headers: {
                    "Authorization" : `${localStorage.getItem('auth')}`
                }
            })
        return response;
    }
}