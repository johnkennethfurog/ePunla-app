import { makeStyles, Theme, createStyles } from "@material-ui/core";
import { CSSProperties } from "@material-ui/styles";
import React, { useCallback, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import clsx from "clsx";
import PlaceHolder from "../../assets/placeholder.jpeg";

type ImageUploaderProps = {
  image?: string;
  style?: CSSProperties;
  onSelectImage: (file: File) => void;
  className?: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    image: {
      objectFit: "cover",
      width: "100%",
    },

    profile: {
      marginTop: 10,
      marginBottom: 20,
      borderRadius: 75,
      height: 150,
      width: 150,
      objectFit: "cover",
    },
  })
);

const baseStyle: CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const ImageUploader = (props: ImageUploaderProps) => {
  const { image, onSelectImage } = props;
  const style = useStyles();

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0] as File;
    const fileUrl = URL.createObjectURL(file);
    setPreview(fileUrl);
    onSelectImage(file);

    // Do something with the files
  }, []);

  const [preview, setPreview] = useState<string>(() => image);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ accept: "image/*", onDrop });

  const divStyle = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
      ...props.style,
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <div {...getRootProps({ style: divStyle })}>
      {!!preview && <img className={style.image} src={preview} />}
      {!preview && <p>Drag 'n' drop your image, or click to select file</p>}
      <input {...getInputProps()}></input>
    </div>
  );
};

export const ProfileUploader = (props: ImageUploaderProps) => {
  const { onSelectImage, image } = props;
  const style = useStyles();

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0] as File;
    const fileUrl = URL.createObjectURL(file);
    setPreview(fileUrl);
    onSelectImage(file);

    // Do something with the files
  }, []);

  const [preview, setPreview] = useState<string>(image);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop,
  });

  return (
    <div
      {...getRootProps({
        style: {
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
          marginBottom: 20,
        },
      })}
    >
      <img className={style.profile} src={!!preview ? preview : PlaceHolder} />
      <span style={{ fontSize: 12, marginTop: -10 }}>
        Click to Change Photo
      </span>
      <input {...getInputProps()}></input>
    </div>
  );
};

export default ImageUploader;
