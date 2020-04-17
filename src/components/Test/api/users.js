function all() {
    return emulateRequest().then(() =>{
        return users.map((users) =>{return{id: users.id, name: users.name}})
    });
}

function get(id) {
    return emulateRequest().then(()=>{
        let num = users.findIndex(user => user.id === id);
        return num === -1 ? null : users[num];
    })

}

export {all, get};
let users = [
    {
        id: 1,
        name: 'Max',
        description: 'Hi, from Kiev',
        age: 39
    },
    {
        id: 2,
        name: 'Jack',
        description: 'Hi, from Sacramento',
        age: 45
    },
    {
        id: 3,
        name: 'Bob',
        description: 'Hi, from Terminator',
        age: 41
    },
    {
        id: 4,
        name: 'Harry',
        description: 'Hi, from Potters',
        age: 25
    }
]
function emulateRequest(timeout = 200) {
    return new Promise((resolve) => {
        window.setTimeout(resolve, timeout)
    });

}