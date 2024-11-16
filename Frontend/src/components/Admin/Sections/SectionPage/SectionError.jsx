import { Link } from "react-router-dom";

export function SectionError() {
    return (
        <div className="flex flex-col justify-center items-center h-[90vh] text-xl">
            Uh oh! Section Not Found!
            <Link to="/sections" className="text-lg font-semibold text-blue-500 hover:underline">
                Go back to Sections
            </Link>
        </div>
    );
}
