import { useFormik } from "formik";
import { useState, useRef } from "react";
import CustomInput from '../../customs/customInput';
import './style.scss';
import SignUpForm from '../signUpForm';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

const SignInPopup = ({setOpenPopup}) => {
    const tabsData = [
        {
            title: 'Sign In',
            type: 'signIn'
        },
        {
            title: 'Sign Up',
            type: 'signUp'
        }
    ]
    const [active, setActive] = useState(tabsData[0].type);
    const ref = useRef();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: (values => {
            if(!Object.keys(formik.errors).length && Object.values(values).every(item => item)) {
                const usersData = JSON.parse(localStorage.getItem('users'))
                const user = usersData?.find(user => user.email === values.email && user.password === values.password);
                if(user) {
                    setOpenPopup(false);
                    Cookies.set('authorization', user.email)
                    localStorage.setItem('user', JSON.stringify(user))
                    navigate(0)
                }else {
                    formik.setFieldError('password', 'Incorrect email or password!')
                }
            }
        }),

        validate: (values => {
            const errors = {};
            if(!values.email) {
                errors.email = 'Email name is required.'
            }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email.'
            }
            if(!values.password) {
                errors.password = 'Password is required.'
            }else if(values.password.length < 8) {
                errors.password = 'Too short !'
            }
            return errors;
        })
    })

    return(
        <div 
            className="popup_back" 
             onClick={(e) => {
                if (ref.current && !ref.current.contains(e.target)) {
                    e.preventDefault();
                    setOpenPopup(false)
                }
            }}>
            <div className="sign_in_popup" ref={ref}>
                    <ul className="tab_section">
                        {tabsData .map((tab, idx) => (
                        <li 
                                key={tab.type + idx}
                                className={`nth_tab ${active === tab.type ? 'active' : ''}`}
                                onClick={() => setActive(tab.type)}
                                >{tab.title}</li>
                        ))}
                    </ul>
                    {active === 'signIn' ? (
                    <form onSubmit={formik.handleSubmit}>
                        <div className="input_field">
                            <div className='nth_input'>
                                <CustomInput type="text" placeholder="Email" name="email" onChange={formik.handleChange} />
                                {formik.touched.email && formik.errors.email &&
                                    <p className='error_message'>{formik.errors.email}</p>}
                            </div>
                            <div className='nth_input'>
                                <CustomInput type="password" placeholder="Password" name="password" onChange={formik.handleChange} />
                                {formik.touched.password && formik.errors.password &&
                                    <p className='error_message'>{formik.errors.password}</p>}
                            </div>
                        </div>
                        <div className="btn">
                            <button type="submit">Sign In</button>
                        </div>
                    </form>) : <SignUpForm setActive={setActive} />}
                    
            </div>
        </div>
            
        
    )
}

export default SignInPopup;