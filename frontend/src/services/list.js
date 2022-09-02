export function fetchLists() {
    return Promise.resolve([
        {name: 'List 1', id: 1},
        {name: 'List 2', id: 2},
    ]);
}