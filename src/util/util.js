export function redirectRoute({
    type,
    avatar
}) {

    let url = (type === "boss") ? "/boss" : "/genius"
    if (!avatar) {
        url += "info"
    }
    return url
}

export const getChatId = (userId,targetId)=>{
    return [userId,targetId].sort().join("_")
}