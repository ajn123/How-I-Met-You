export default function Event({ event }) {
    return (
        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-lg">
            <p className="text-lg">{event.name}</p>
            <p className="text-lg">{event.description}</p>
            <p className="text-lg">
                The application is designed to be a simple demonstration of how
                to use Laravel and React together.
            </p>
        </div>
    );
}
