export const LoaderPage = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-0 z-10 flex items-center justify-center">
      <div className="flex items-center space-x-2 text-white bg-slate-700 px-4 py-2 rounded">
        <i className="ki-duotone ki-setting-2 animate-spin text-md"></i>
        <span>Loading...</span>
      </div>
    </div>
  );
};
