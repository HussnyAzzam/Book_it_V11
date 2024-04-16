export const convertArrayToObject = (expectedEntries) => {
    const suppliedEntries = expectedEntries.filter(obj => Object.values(obj)[0] !== undefined)
    const definedEntries = suppliedEntries.reduce((obj, item) => ({ ...obj, ...item }), {})
    return definedEntries
}