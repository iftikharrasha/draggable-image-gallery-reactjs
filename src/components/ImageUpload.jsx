import PropTypes from 'prop-types';
import upload from '../assets/images//upload.webp'

const ImageUpload = ({handleFileUpload}) => {
    return (
        <li className="upload">
            <input
                type="file"
                multiple
                name="uploads"
                onChange={handleFileUpload}
            />
            <div className='upload__icon'>
                <img src={upload} alt="upload" width={25}/>
                <p>ADD IMAGE</p>
            </div>
        </li>
    );
};

ImageUpload.propTypes = {
    handleFileUpload: PropTypes.func.isRequired,
};

export default ImageUpload;