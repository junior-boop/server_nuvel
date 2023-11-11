import IdGenerator from "./id_generator";
import Metadata_images from "./modifie_images_name";

export default function SaveImages({bucket, images}){
    const image_Path = []

    images.forEach( async image => {
				
        const metadata = Metadata_images(image[1])
        
        const object = {
            ...metadata,
            path :'/' + metadata.name,
            createdAt : Date.now(),
            key : IdGenerator(15, 5)
        };

        console.log(object)

        await bucket.put(object.name, image[1], {
            customMetadata : {
                name : object.name,
                size : object.size,
                type : object.minetype,
                lastModified : object.lastmodified,
            },
            httpMetadata : {
                contentType: object.minetype
            }
        })
        image_Path.push({image : object.name, original : object.originalname})
    
    })

    return image_Path
}