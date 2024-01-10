export function makeProfileImageURL(image_name) {
    const url =
        "http://localhost:" +
        import.meta.env.VITE_BACKEND_PORT +
        "/images/profiles/";
    return url + image_name;
}

export function makeQuestionImageURL(image_name) {
    const url =
        "http://localhost:" +
        import.meta.env.VITE_BACKEND_PORT +
        "/images/questions/";
    return url + image_name;
}

export function makeAnswerImageURL(image_name) {
    const url =
        "http://localhost:" +
        import.meta.env.VITE_BACKEND_PORT +
        "/images/answers/";
    return url + image_name;
}
export function makeChatImageURL(image_name) {
    const url =
        "http://localhost:" +
        import.meta.env.VITE_BACKEND_PORT +
        "/images/chats/";
    return url + image_name;
}

export function isNumber(str) {
    return /^-?\d*\.?\d+$/.test(str);
}

export const formatDateAndTimeFromString = (dateString) => {
    const date = new Date(dateString);
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    console.log(date.toLocaleDateString("en-US", options));
    return date.toLocaleDateString("en-US", options);
};
