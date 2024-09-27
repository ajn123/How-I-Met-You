import AuthLayout from "../Layouts/AuthLayout";

export default function About({ auth }) {
    return (
        <AuthLayout auth={auth}>
            <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-lg">
                <p className="text-lg max-w-96">
                    This is an application built with love by Alex Norton. If
                    you are interested in building community or starting your
                    own, feel free{" "}
                    <a
                        className={"font-bold hover:underline"}
                        href={"mailto:ajn123@vt.edu"}
                    >
                        to reach out
                    </a>
                    . The source code can be found on GitHub.
                </p>
            </div>
        </AuthLayout>
    );
}
