

export const urlValidation = (url) => {
    // Regex to check if the URL starts with http:// or https:// (case-sensitive)
    const regex = /^https?:\/\//;
    return regex.test(url);

}