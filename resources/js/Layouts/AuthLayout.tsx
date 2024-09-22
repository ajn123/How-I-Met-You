import NavBar from "../Components/NavBar";

export default function Auth({
    auth,
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={"container mx-auto p-4"}>
            <NavBar auth={auth} />
            <div>{children}</div>
        </div>
    );
}
