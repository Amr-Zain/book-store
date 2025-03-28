const SliderItemsSkeleton = () => {
  return (
    <div className="w-full overflow-x-hidden pb-4">
      <div className="flex gap-6 w-max min-w-full">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="flex flex-col sm:flex-row sm:h-72 gap-2 min-w-[100%] sm:min-w-[390px]  
              flex-shrink-0 bg-white rounded-lg shadow-sm animate-pulse"
          >
            <div className="sm:w-48 h-48 sm:h-full bg-gray-200 rounded-lg flex-shrink-0" />

            <div className="flex-1 p-4 space-y-3">
              <div className="h-6 bg-gray-200 rounded w-3/4" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
              <div className="h-10 bg-gray-200 rounded-md mt-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SliderItemsSkeleton;
