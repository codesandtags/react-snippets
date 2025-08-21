import * as React from "react";
import { uploadFileToStorage, verifyUpload } from "./api";
import { closeIcon, uploadIcon } from "./icons";

export default function FileUpload() {
  const [error, setError] = React.useState(null);
  const [imgUrl, setImgUrl] = React.useState(null);
  const [isPending, startTransition] = React.useTransition();

  const handleUpload = async (e) => {
    setError(null);
    const file = e.target.files[0];
    if (!file) return;
    setImgUrl(URL.createObjectURL(file));
    startTransition(async () => {
      try {
        const { url, filename } = await uploadFileToStorage(file);
        await verifyUpload(filename);
        startTransition(() => {
          setImgUrl(url);
        });
      } catch (e) {
        setError(e.message);
        setImgUrl(null);
      }
    });
  };

  return (
    <div className="file-uploader">
      <div className="file-upload-wrapper">
        {imgUrl ? (
          <figure className="upload-preview">
            <img
              src={imgUrl}
              className="image-preview"
              style={{
                opacity: isPending ? 0.5 : 1,
                transition: "opacity .3s ease-in-out",
              }}
            />
            {isPending ? (
              <div className="upload-indicator">Uploading...</div>
            ) : (
              <button className="delete-button" onClick={() => setImgUrl(null)}>
                {closeIcon}
              </button>
            )}
          </figure>
        ) : (
          <label htmlFor="file-input">
            {uploadIcon}
            <span>Click to upload a file</span>
            <input
              id="file-input"
              type="file"
              onChange={handleUpload}
              accept=".png, .jpg, .jpeg, .webp"
            />
          </label>
        )}
      </div>
      {error && (
        <div className="error-message">
          There was an error uploading your file. Try again.
        </div>
      )}
    </div>
  );
}