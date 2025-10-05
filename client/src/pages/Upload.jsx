import { useState } from "react";
import { uploadAPI } from "../services/api";
import FileUpload from "../components/Fileupload";
import UploadProgress from "../components/UploadProgress";

const Upload = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [error, setError] = useState("");

  const handleFileUpload = async (file) => {
    setUploading(true);
    setError("");
    setUploadResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await uploadAPI.uploadFile(formData);
      setUploadResult(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">File Upload</h1>
        <p className="mt-1 text-sm text-gray-500">
          Upload CSV files to distribute contacts among agents
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <FileUpload onFileSelect={handleFileUpload} disabled={uploading} />

        {uploading && <UploadProgress />}

        {error && (
          <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {uploadResult && (
          <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            <h3 className="font-medium">Upload Successful!</h3>
            <p>Total contacts processed: {uploadResult.total}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
