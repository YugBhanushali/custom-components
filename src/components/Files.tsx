import React, { useRef, useState } from "react";

import { UploadIcon, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function DialogCloseButton() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setselectedFiles] = useState<File[] | null>();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray: File[] = Array.from(e.target.files);
      setselectedFiles(filesArray);
    }
  };

  const removeFile = (fileName: string) => {
    const updatedFiles = selectedFiles?.filter(
      (file) => file.name !== fileName
    );
    setselectedFiles(updatedFiles);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Select files</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Files</DialogTitle>
        </DialogHeader>
        <div className="flex items-center">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => {
              onInputChange(e);
              console.log(selectedFiles);
            }}
            multiple={true}
          />
          <div className="flex flex-col"></div>
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-[120px] max-h-[200px]"
          >
            <div className=" border border-1 border-dashed border-muted-foreground rounded-md w-full flex justify-center items-center h-full">
              <div className="flex flex-col justify-center items-center py-4">
                <UploadIcon size={30} className=" text-muted-foreground" />
                <p className=" text-muted-foreground">Upload files</p>
              </div>
            </div>
          </div>
        </div>
        <div className=" overflow-y-auto">
          {selectedFiles &&
            selectedFiles.map((file, index) => {
              return (
                <div
                  key={index}
                  className="flex hover:bg-secondary rounded-md p-2 justify-between"
                >
                  <div className="flex">
                    {file.name.length > 25
                      ? file.name.substring(0, 25) +
                        "..." +
                        file.name.substring(
                          file.name.length - 6,
                          file.name.length
                        )
                      : file.name}
                  </div>
                  <div className="flex gap-x-2 justify-center items-centers">
                    {/* can add popover to show the file specification such as file type and name, size */}
                    {/* <div className="flex justify-center items-center">
                      <Info size={20} />
                    </div> */}
                    <div
                      onClick={() => removeFile(file.name)}
                      className="m-0 border-1 border border-transparent  hover:border-1 hover:border hover:border-secondary rounded-md cursor-pointer"
                    >
                      <X />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </DialogContent>
    </Dialog>
  );
}

const Files = () => {
  return (
    <div>
      <DialogCloseButton />
    </div>
  );
};

export default Files;
