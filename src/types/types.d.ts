// Image models returned from the API
export type ImageData = {
    uuid: string;
    title: string;
    description: string;
    imagePath: string;
    favourite: boolean;
    height: number;
    width:number;
    filesize:number;
    createdAt: Date;
};