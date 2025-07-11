import { $api } from "@/lib/api";

interface UploadFileParams {
  url: string;
  file: File | Blob;
}

export const useFiles = () => {
  const { mutateAsync } = $api.useMutation("post", "/api/v1/file/signed-url");

  const uploadFile = async ({ url, file }: UploadFileParams) => {
    const response = await fetch(url, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    });

    return response;
  };
  return {
    getUrlUpload: mutateAsync,
    uploadFile,
  };
};
