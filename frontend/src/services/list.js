import axios from 'axios';

export async function fetchLists(accessToken) {
    const lists = await axios.get("http://localhost:8080/lists", {
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
    });
    return lists;
    // return Promise.resolve([
    //     {name: 'List 1', id: 1},
    //     {name: 'List 2', id: 2},
    // ]);
}