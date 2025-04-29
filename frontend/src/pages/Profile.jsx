const Profile = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto grow p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
          {/* right section */}
          <div className="w-full md:w-1/3 lg:w-1/4 shadow-md rounded-lg p-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">John doe</h1>
            <p className="text-lg text-gray-600 mb-4">john@wxample.com</p>
            <button className="bg-red-500 w-full rounded-lg p-2 text-white text-lg hover:bg-red-400 cursor-pointer">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
