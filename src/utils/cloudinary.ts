export const uploadImageToCloudinary = async (file: File) => {
    let errorUploadImage = null;
    let imageUrl = null;

    try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append(
            "upload_preset",
            `${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`
        );

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
            {
                method: "POST",
                body: formData,
            }
        );

        const data = await response.json();
        imageUrl = data.secure_url;
    } catch {
        errorUploadImage = "No se pudo cargar la imagen, inténtelo de nuevo.";
    }

    return { errorUploadImage, imageUrl };
};
