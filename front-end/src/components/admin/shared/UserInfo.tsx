const UserInfo= () => (
    <div className="flex flex-shrink-0 items-center ml-auto">
      <div className="hidden md:flex md:flex-col md:items-end md:leading-tight mr-4">
        <span className="font-semibold">Grace Simmons</span>
        <span className="text-sm text-gray-600">Lecturer</span>
      </div>
      <div className="relative h-12 w-12 rounded-full overflow-hidden">
        <img 
          src="https://randomuser.me/api/portraits/women/68.jpg" 
          alt="User profile" 
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
export default UserInfo