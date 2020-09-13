export const updateObjectArray = (items: any, itemId: any, objPropsName: any, newObjProps: any) => {
    return items.map((u: any) => {
        if(u[objPropsName] === itemId){
            return {...u, ...newObjProps}
        }
        return u;
    })
}
