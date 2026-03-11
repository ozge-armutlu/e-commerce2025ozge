import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ component: Component, ...rest }) {
    // Redux'tan kullanıcıyı, localStorage'dan token'ı kontrol et
    const user = useSelector((state) => state.client.user);
    const token = localStorage.getItem("token");

    return (
        <Route 
            {...rest}
            render={(props) => 
                // Eğer hem user objesi (id bazlı) hem de token varsa sayfaya izin ver
                (user && user.id) || token ? (
                    <Component {...props} />
                ) : (
                    <Redirect 
                        to={{
                            pathname: "/login",
                            state: { from: props.location }, // props.location önündeki ? işaretini kaldırdık
                        }}
                    />
                )
            }
        />
    );
}