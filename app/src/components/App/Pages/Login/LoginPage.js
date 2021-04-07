import {useState} from "react";
import Container from "../../../Design/Container";
import Styles from './LoginPage.module.scss'
import Input from "../../../Design/Input";
import Button from "../../../Design/Button";
import * as yup from 'yup';
import {login} from "../../../../core/modules/auth/api";
import {getValidationErrors} from "../../../../core/utils/validation";
import Alert from "../../../Design/Alert";
import {handleApiResult} from "../../../../core/utils/api";
import ApiError from '../../../../core/error/apiError'
import AppError from "../../../../core/error/appError";
import ErrorAlert from "../../../Shared/ErrorAlert";

let schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
});

const LoginPage = ({setUser}) => {
    const [data, setData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [error, setError] = useState();

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        schema.validate(data, {abortEarly: false}).then(()=> {
            login(data)
                .then(handleApiResult)
                .then((data) => {
                    setUser(data)
                })
                .catch((e) => {
                    if(e instanceof ApiError) {
                        if (e.isUnauthorized()) {
                            setError(new AppError('Wrong combination'))
                        } else {
                            setError(e)
                        }
                    } else {
                        setError(new AppError(e));
                    }


                })
        }).catch((err) => {
            setErrors(getValidationErrors(err));
        })
    };

    return (
        <Container>
            <div className="text-center" >
                <form className={Styles['form-signin']} onSubmit={handleSubmit} noValidate={true}>
                    <img className="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"/>
                    <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>

                    <label htmlFor="email" className="sr-only">Email address</label>
                    <Input type="email" name="email" value={data.email} onChange={handleChange} error={errors.email} />

                    <label htmlFor="password" className="sr-only">Password</label>
                    <Input type="password" name="password" value={data.password} onChange={handleChange} error={errors.password} />

                    <ErrorAlert err={error} />
                    <Button color="primary" type="submit">Sign in</Button>
                </form>
            </div>
        </Container>
    )
};

export default LoginPage;
