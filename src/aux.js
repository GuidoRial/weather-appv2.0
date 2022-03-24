
export const clearAllInputs = () => {
    Array.from(document.querySelectorAll("input")).forEach((input) => {
        input.value = "";
    });
};
