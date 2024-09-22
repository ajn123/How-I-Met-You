import NavBar from "../Components/NavBar";

export default function Auth({
    auth,
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={"container mx-auto p-4"} id={"below"}>
            <NavBar auth={auth} />
            <div id={"content"}>{children}</div>
        </div>
    );
}
