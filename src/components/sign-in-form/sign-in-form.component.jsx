import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import "./sign-in-form.styles.scss";

const defaultformFields = {
    email: '',
    password: '', 
};

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultformFields);
    const {email, password} = formFields;

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]:value});
    };

    const resetFormFields = () => {
        setFormFields(defaultformFields);
    }

    const SignInWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const {user} = await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
            
        } catch(error) {
            switch(error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with email');
                    break;
                default:
                    console.log(error);
            }
        };
    };

    return(
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type='email' required onChange={handleChange} name="email" value={email}></FormInput>

                <FormInput label="Password" type='password' required onChange={handleChange} name="password" value={password}></FormInput>

                <div className="buttons-container">
                    <Button buttonType='inverted' type="submit">Sign In</Button>
                    <Button buttonType={BUTTON_TYPE_CLASSES.google} type="button" onClick={SignInWithGoogle}>Google Sign In</Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;