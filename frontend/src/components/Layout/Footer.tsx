export const Footer = () => {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">
              Based on the 100 principles for a Resource-Based Economy
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Working towards a sustainable, equitable civilization free from war, poverty, and unnecessary
              suffering
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/The-Venus-Project-AI/100-Rules-Jacque-Fresco-Would-Suggest-We-Follow"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              GitHub Repository
            </a>
            <span className="text-sm text-gray-500">Last Updated: {new Date().toLocaleString()}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
