export const getItem = async(key) => {
    const item = localStorage.getItem(key)
    if(!!item) {
        return JSON.parse(item)
    } else {
        throw new Error('Wrong key')
    }
}

export const setItem = async(key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}