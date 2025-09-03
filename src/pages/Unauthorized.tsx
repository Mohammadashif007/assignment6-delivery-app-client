import { Link } from "react-router";


const Unauthorized = () => {
    return (
        <div>
            <h1>You are Unauthorized</h1>
            <Link to="/home">Home</Link>
        </div>
    );
};

export default Unauthorized;