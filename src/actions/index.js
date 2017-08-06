export const UPLOAD_DATA = 'upload_data';

export function uploadData(data) {
    return {
        type: UPLOAD_DATA,
        payload: data
    };
}
