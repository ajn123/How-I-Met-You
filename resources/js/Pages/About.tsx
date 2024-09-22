import AuthLayout from "../Layouts/AuthLayout";

export default function About() {
    return (
        <AuthLayout>
            <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-lg">
                <p className="text-lg">
                    This is a demo application built with Laravel and React.
                </p>
                <p className="text-lg">
                    It uses the React Router for client-side routing and the
                    Laravel Sanctum package for authentication.
                </p>
                <p className="text-lg">
                    The application is designed to be a simple demonstration of
                    how to use Laravel and React together.
                </p>
            </div>
        </AuthLayout>
    );
}
