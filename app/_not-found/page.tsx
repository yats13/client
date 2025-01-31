export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-purple-600">404</h1>
            <p className="text-xl text-gray-600 mt-4">Страница не найдена</p>
            <a href="/" className="mt-6 px-6 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition">
                На главную
            </a>
        </div>
    );
}
