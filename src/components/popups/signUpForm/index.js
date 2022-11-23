import { useFormik } from 'formik';
import CustomInput from '../../customs/customInput';

const SignUpForm = ({setActive}) => {
    const formik = useFormik({
        initialValues: {
            name: '',
            lastname: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: ''
        },
        onSubmit: (values => {
            if(!Object.keys(formik.errors).length && Object.values(values).every(item => item)) {
                const usersData = JSON.parse(localStorage.getItem('users'));
                if(usersData) {
                    if(!usersData.find(item => item.email === values.email)) {
                        usersData.push(values)
                        localStorage.setItem('users', JSON.stringify(usersData))
                        
                    }else {
                        formik.setFieldError('email', 'Email address already is registered!')
                    }
                    setActive('signIn')
                }else {
                    localStorage.setItem('users', JSON.stringify([values]))
                }
            }
        }),
        validate: (values => {
            const errors = {};
            if(!values.name) {
                errors.name = 'Name is required.'
            }else if(values.name.length < 3) {
                errors.name = 'Too short !'
            }
            if(!values.lastname) {
                errors.lastname = 'Lastname is required.'
            }else if(values.lastname.length < 3) {
                errors.lastname = 'Too short !'
            }
            if(!values.email) {
                errors.email = 'Email name is required.'
            }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email.'
            }
            const PHONE_REGEX = new RegExp(/"^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"/gmi);
            if(!values.phone) {
                errors.phone = 'Phone name is required.'
            }else if(!/^[0-9\b+]+$/.test(values.phone) || values.phone.length < 9) {
                errors.phone = 'Invalid phone.'
            }
            if(!values.password) {
                errors.password = 'Password is required.'
            }else if(values.password.length < 8) {
                errors.password = 'Too short !'
            }
            if(!values.confirmPassword) {
                errors.confirmPassword = 'Repeat the password.'
            }else if(values.confirmPassword !== values.password) {
                errors.confirmPassword = 'Password don\'t match.'
            }
            return errors;
        })
    })

    return(
        <form onSubmit={formik.handleSubmit}>
            <div className="input_field">
                <div className='nth_input'>
                    <CustomInput type="text" placeholder="Name" name="name" onChange={formik.handleChange} />
                        {formik.touched.name && formik.errors.name &&
                            <p className='error_message'>{formik.errors.name}</p>}
                </div>
                <div className='nth_input'>
                    <CustomInput type="text" placeholder="Lastname" name="lastname" onChange={formik.handleChange} />
                    {formik.touched.lastname && formik.errors.lastname &&
                        <p className='error_message'>{formik.errors.lastname}</p>}
                </div>
                <div className='nth_input'>
                    <CustomInput type="text" placeholder="Email" name="email" onChange={formik.handleChange} />
                    {formik.touched.email && formik.errors.email &&
                        <p className='error_message'>{formik.errors.email}</p>}
                </div>
                <div className='nth_input'>
                    <CustomInput type="text" placeholder="Phone" name="phone" onChange={formik.handleChange} />
                    {formik.touched.phone && formik.errors.phone &&
                        <p className='error_message'>{formik.errors.phone}</p>}
                </div>
                <div className='nth_input'>
                    <CustomInput type="password" placeholder="Password" name="password" onChange={formik.handleChange} />
                    {formik.touched.password && formik.errors.password &&
                        <p className='error_message'>{formik.errors.password}</p>}
                </div>
                <div className='nth_input'>
                    <CustomInput type="password" placeholder="Confirm Password" name="confirmPassword" onChange={formik.handleChange} />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword &&
                        <p className='error_message'>{formik.errors.confirmPassword}</p>}
                </div>
            </div>
            <div className="btn">
                <button type='submit'>Sign Up</button>
            </div>
        </form>
    )
}

export default SignUpForm;