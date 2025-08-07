import { Login } from "../components/authorization"
import { Intro } from "../components/info"  
export const Signin = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="flex justify-center">
                <Login buttonText={"SignIn"}/>
            </div>
            <div className="hidden lg:block">
                <Intro />
            </div>
        
        </div>
    )
}