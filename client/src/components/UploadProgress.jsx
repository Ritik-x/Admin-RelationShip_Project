const UploadProgress = () => {
  return (
    <div className="mt-4">
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              Processing file...
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>Please wait while we process and distribute your contacts.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadProgress;
