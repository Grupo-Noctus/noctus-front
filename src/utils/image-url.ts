export function getImageUrl(imagePath: string | null): string {
    if (!imagePath) {
        return "https://placehold.co/600x400";
    }

    const cleanPath = imagePath.replace(/^[/\\]+/, "");
    return `${import.meta.env.VITE_API_URL}/uploads/${cleanPath}`;
}

export function getMaterialUrl(imagePath: string | null): string {
    if (!imagePath) {
        return "https://placehold.co/600x400";
    }

    const cleanPath = imagePath.replace(/^[/\\]+/, "");
    return `${import.meta.env.VITE_API_URL}/uploads/materials/${cleanPath}`;
}
