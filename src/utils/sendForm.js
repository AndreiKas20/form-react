export const sendForm = (name, number, text) => {
    const formObj = {
        name: name,
        telephone: number.replace(/[()_-]/g, ''),
        text: text,
    }
    return new Blob(
        [JSON.stringify(formObj)],
        {
            type: 'application/json'
        }
    )
}