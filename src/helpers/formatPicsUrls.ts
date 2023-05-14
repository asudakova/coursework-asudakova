export const formatPicsUrls = (extra_info: any) => {
    if (!extra_info) {
        return null
    }
    const photoUrls: string[] = [];
    if (extra_info) {
        extra_info.forEach((photo: any) => {
            if (photo.main_photo_url) {
                photoUrls.push(photo.main_photo_url);
            }
        })
    }
    return photoUrls;
}