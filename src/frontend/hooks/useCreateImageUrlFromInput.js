const useCreateImageUrlFromInput = (props) => {
    const createImageUrl = (data) => {
        const file = data.target.files[0];
        const imageUrlPreview = URL.createObjectURL(file);
        return imageUrlPreview
    }
    return createImageUrl;
}
export default useCreateImageUrlFromInput;