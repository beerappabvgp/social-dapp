"use client";

import { useState } from 'react';
import { getContract } from '../utils/contract';
import axios from 'axios';

// pinata
const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1ZDYwMGZiNS02M2I1LTQzM2QtYWVmNi0yY2EwNDNjMDRiYzAiLCJlbWFpbCI6ImJlZXJhcHBhYmhhcmF0aGJAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImFhN2Y1NjgwN2Y1OGJiNzU1OWUxIiwic2NvcGVkS2V5U2VjcmV0IjoiNjIwNWJhODI3NmY0YjY1YzcyM2UxYzFjYjEzYTZjNjAyYzIzOTlmNTNhYjEyZDU2MGY2NmVkOTNmYTRiODZkMiIsImlhdCI6MTcyNjY1Mzc0MH0.MoKrWFddLZlc3YV3t3_gacnvN5a9S0QqlVg4pn38b1o";


const uploadToPinata = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const pinataMetadata = JSON.stringify({
    name: 'File name',
  });
  formData.append('pinataMetadata', pinataMetadata);

  const pinataOptions = JSON.stringify({
    cidVersion: 0,
  });
  formData.append('pinataOptions', pinataOptions);

  try {
    const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
      maxBodyLength: 10e19,
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        'Authorization': `Bearer ${JWT}`
      }
    });

    const url = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
    return url;
  } catch (error) {
    console.error("Error uploading file to Pinata", error);
    throw error;
  }
};

const CreatePost = ({ provider }: any) => {
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async () => {
    if (!provider) {
      return alert('Please connect wallet first');
    }

    const contract = getContract(provider);
    let pinataImageUrl = '';

    if (imageFile) {
      setIsUploading(true);
      try {
        pinataImageUrl = await uploadToPinata(imageFile);
        setImageUrl(pinataImageUrl);
      } catch (err) {
        setIsUploading(false);
        return alert("Failed to upload image");
      }
    }

    try {
      const tx = await contract.createPost(content, pinataImageUrl);
      await tx.wait();
      alert('Post created successfully!');
      setContent('');  
      setImageFile(null); 
      setImageUrl('');  
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-6 text-black">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Create a Post</h2>

      <textarea
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <label className="block mb-2 text-gray-600">Attach an image:</label>
      <input
        type="file"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
      />


      {imageUrl && (
        <div className="mt-4">
          <img
            src={imageUrl}
            alt="Uploaded"
            className="w-full h-64 object-cover rounded-md shadow-md"
          />
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={isUploading}
        className={`w-full mt-4 p-3 text-white font-semibold rounded-md transition ${
          isUploading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
        } focus:outline-none focus:ring-2 focus:ring-blue-400`}
      >
        {isUploading ? 'Uploading...' : 'Create Post'}
      </button>

      {isUploading && (
        <p className="text-blue-500 mt-2 text-sm text-center">Please wait while your image is being uploaded...</p>
      )}
    </div>
  );
};

export default CreatePost;
