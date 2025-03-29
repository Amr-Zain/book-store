const SkeletonRow = () => (
    <tr>
      <td className="border-t-0 px-2 md:px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2 text-left hidden md:table-cell">
        <div className="h-4 bg-gray-200 rounded w-4 animate-pulse" />
      </td>
      <td className="border-t-0 px-2 md:px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2 font-semibold truncate max-w-[120px] md:max-w-none">
        <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
      </td>
      <td className="border-t-0 px-2 md:px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2 hidden md:table-cell">
        <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
      </td>
      <td className="border-t-0 px-2 md:px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2 hidden md:table-cell">
        <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
      </td>
      <td className="border-t-0 px-2 md:px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
        <div className="flex flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="h-6 w-6 bg-gray-200 rounded animate-pulse" />
          <div className="h-8 w-16 bg-gray-200 rounded-full animate-pulse" />
        </div>
      </td>
    </tr>
  );
  
export default SkeletonRow