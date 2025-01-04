export const uploadImageToCloudinary = async (file: File) => {
    let errorUploadImage = null;
    let imageUrl = null;

    try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append(
            "upload_preset",
            `${process.env.CLOUDINARY_UPLOAD_PRESET}`
        );

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/image/upload`,
            {
                method: "POST",
                body: formData,
            }
        );

        const data = await response.json();
        console.log("Response data:", data);
        imageUrl = data.secure_url;
    } catch (error) {
        console.log(error);
        errorUploadImage = "No se pudo cargar la imagen, inténtelo de nuevo.";
    }

    return { errorUploadImage, imageUrl };
};
