import './style.scss';

const CustomInput = (props) => {

    return(
        <div className="custom_input">
            <input {...props} />
        </div>
    )
}

export default CustomInput;