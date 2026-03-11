import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { loginThunk } from "../store/thunks/authThunks";



function Login() {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const redirectPath = location.state?.from?.pathname || "/";

    const {
        register,
        handleSubmit,
        formState: { errors }, 
    } = useForm();


    const onSubmit = (data) => {
        
        dispatch(loginThunk(data, redirectPath, history));
    };


    return (
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-xl font-bold mb-4">Login</h2>
        <form onSubmit = {handleSubmit(onSubmit)} className="space-y-4 max-w-sm mx-auto">
            <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                type="email"
                className="w-full border px-3 py-2 rounded"
                placeholder="Email"
                {...register("email", {
                    required:"Email zorunlu",
                    pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Geçerli bir email gir"
                    },
                })}
                 />
                 {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Password</label>
                <input

                type="password"
                placeholder="Password"
                className="w-full border px-3 py-2 rounded"
                {...register("password", { required: "Şifre zorunlu" })}
                />
                </div>

                <div className="flex items-center gap-2">
                
                <input 
                type="checkbox" 
                className="w-4 h-4"
                
                {...register("rememberMe")}/>

                <label className="text-sm">Remember me</label>
                </div>
                <button type= "submit" className="w-full bg-black text-white py-2 rounded">Login</button>
        </form>
        </div>
    );
}
export default Login;