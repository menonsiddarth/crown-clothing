import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import "./sign-up-form.styles.scss";
import Button from "../button/button.component";

const defaultformFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
};


const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultformFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]:value});
    };

    const resetFormFields = () => {
        setFormFields(defaultformFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword) {
            alert('password do not match');
            return;
        };

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);

            await createUserDocumentFromAuth(user, {displayName});

            resetFormFields();

        } catch(error) {
            if(error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use', error);
            } else {
                console.log(error);
            }
            console.log('user creation encountered an error',error);
        };
    };

    return(
        <div className="sign-up-container">
            <h2>Dont have an account?</h2>
            <span>Sign up with email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" type='text' required onChange={handleChange} name="displayName" value={displayName}></FormInput>

                <FormInput label="Email" type='email' required onChange={handleChange} name="email" value={email}></FormInput>

                <FormInput label="Password" type='password' required onChange={handleChange} name="password" value={password}></FormInput>

                <FormInput label="Confirm Password" type='password' required onChange={handleChange} name="confirmPassword" value={confirmPassword}></FormInput>
                <Button buttonType='inverted' type="submit">Sign Up</Button>
            </form>
        </div>
    );
}

export default SignUpForm;