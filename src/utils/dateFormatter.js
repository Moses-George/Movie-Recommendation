
export const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleString('en-UK', {
        year: "numeric",
        month: "short",
        day: "numeric"
    });
}