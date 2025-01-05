import { createHash } from "crypto";

const uploadImageToCloudinary = async (file: File) => {
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

const deleteImageFromCloudinary = async (imageUrl: string) => {
    let errorDeleteImage;
    const publicId = imageUrl.split("/").pop()!.split(".")[0];
    const timestamp = Math.round(Date.now() / 1000);
    const signature = createHash("sha256")
        .update(
            `public_id=${publicId}&timestamp=${timestamp}${process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET}`
        )
        .digest("hex");

    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/destroy`;

    const body = new FormData();
    body.append("public_id", publicId);
    body.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
    body.append("api_secret", process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET!);
    body.append("timestamp", timestamp.toString());
    body.append("signature", signature);

    try {
        const response = await fetch(url, {
            method: "POST",
            body: body,
        });

        await response.json();
    } catch {
        errorDeleteImage =
            "No se pudo eliminar la imagen anterior, intente de nuevo registrar el producto";
    }

    return errorDeleteImage;
};

export { uploadImageToCloudinary, deleteImageFromCloudinary };
