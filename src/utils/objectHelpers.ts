export const updateObjectArray = (items: any, itemId: any, objPropsName: any, newObjProps: any) => {
    return items.ma((u: any) => {
        if(u[objPropsName] === itemId){
            return {...u, ...newObjProps}
        }
        return u;
    })
}
