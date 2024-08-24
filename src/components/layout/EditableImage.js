// import Image from "next/image";
// import toast from "react-hot-toast";

// export default function EditableImage({link, setLink}) {

//   async function handleFileChange(ev) {
//     const files = ev.target.files;
//     if (files?.length === 1) {
//       const data = new FormData;
//       data.set('file', files[0]);

//       const uploadPromise = fetch('/api/upload', {
//         method: 'POST',
//         body: data,
//       }).then(response => {
//         if (response.ok) {
//           return response.json().then(link => {
//             setLink(link);
//           })
//         }
//         throw new Error('Something went wrong');
//       });

//       await toast.promise(uploadPromise, {
//         loading: 'Uploading...',
//         success: 'Upload complete',
//         error: 'Upload error',
//       });
//     }
//   }

//   return (
//     <>
//       {link && (
//         <Image className="rounded-lg w-full h-full mb-1" src={link} width={250} height={250} alt={'avatar'} />
//       )}
//       {!link && (
//         <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
//           No image
//         </div>
//       )}
//       <label>
//         <input type="file" className="hidden" onChange={handleFileChange} />
//         <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">Change image</span>
//       </label>
//     </>
//   );
// }

import React, { useState } from "react";

const EditableImage = ({ link, setLink }) => {
  const [uploadError, setUploadError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  // const [imageUrl, setImageUrl] = useState("");

  console.log(link);

  const Spinner = () => (
    <div className="flex justify-center items-center">
      <svg
        className="animate-spin h-12 w-12 text-blue-500" // Increase size here
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V1a10 10 0 00-10 10h2zm0 0a8 8 0 008 8v-2a6 6 0 01-6-6H4z"
        />
      </svg>
    </div>
  );

  const uploadImageToCloudinary = async (file) => {
    const CLOUD_NAME = "dj5vexpr2"; // Replace with your Cloudinary Cloud Name
    const UPLOAD_PRESET = "lakjas"; // Replace with your Cloudinary Upload Preset

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      setLoading(true); // Set loading to true when starting the upload
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Cloudinary API error: ${errorData.error.message}`);
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploadError(`Error uploading image: ${error.message}`);
      return null;
    } finally {
      setLoading(false); // Set loading to false after upload is complete
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = await uploadImageToCloudinary(file);
      if (url) {
        setLink(url);
        // if (onUpload) onUpload(url);
      }
    }
  };

  return (
    <div className="">
      {link && (
        <div className="text-center mt-4">
          <h2 className="text-lg font-medium">Image</h2>
          <img
            src={link}
            alt="Uploaded"
            className="mt-2 max-w-full h-auto rounded mb-3"
          />
        </div>
      )}
      {loading && <Spinner />} {/* Show spinner while loading */}
      {uploadError && <p className="text-red-600">{uploadError}</p>}
      <label
        htmlFor="ImgUld"
        className=" text-center block px-6 py-3 font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 transition ease-in-out duration-300"
      >
        Select Image
        <input
          id="ImgUld"
          type="file"
          onChange={handleImageUpload}
          className="mb-4 p-2 border border-gray-300 rounded-lg hidden"
          accept="image/*"
        />
      </label>
    </div>
  );
};

export default EditableImage;
