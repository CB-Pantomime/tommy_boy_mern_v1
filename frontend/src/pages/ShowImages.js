
import React, { useEffect, useState, Fragment } from 'react';
import { Image } from 'cloudinary-react';
import { useAuthContext } from '../hooks/useAuthContext'
import Upload from '../components/Upload';

export default function ShowImages() {
    const { user } = useAuthContext();

    const [imageIds, setImageIds] = useState();
    const loadImages = async () => {
        try {
            const res = await fetch('/api/v1/blogs');
            const data = await res.json();
            setImageIds(data);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        loadImages();
    }, [loadImages]);
    return (
        <div className="home">
        {/* Returns for public */}
        {!user && <div className='allImages'>        
        <h1 className="title">show all images</h1>
            <div className="gallery">
            {imageIds &&
            imageIds.map((imageId, index) => (
                // Image - defines a Cloudinary Image tag
                <Image
                    key={index}
                    cloudName={'dxov7pk4a'}
                    publicId={imageId}
                    width="300"
                    crop="scale"
                />
                ))}
            </div>
        </div>
        }
        {/* Returns for auth/logged in */}
        {user && 
        <Fragment>
        <div className='allImages'>        
        <h1 className="title">show all images</h1>
            <div className="gallery">
            {imageIds &&
                imageIds.map((imageId, index) => (
                    // Image - defines a Cloudinary Image tag
                    <Image
                        key={index}
                        cloudName={'dxov7pk4a'}
                        publicId={imageId}
                        width="300"
                        crop="scale"
                    />
                ))}
            </div>
        </div>
            <Upload />             
        </Fragment>
        }          
{/* Last DIV */}
</div>  
)};

