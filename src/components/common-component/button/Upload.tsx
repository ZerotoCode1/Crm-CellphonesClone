interface Props {
  handleFileUpload: (file: any) => void;
}

const UploadFile = (props: Props) => {
  const { handleFileUpload } = props;
  return (
    <div className=" border-dashed border px-4 py-8 flex justify-center rounded-sm" style={{ width: "100%" }}>
      <label style={{ fontSize: "18px", color: "#333" }} htmlFor="file-upload">
        Chọn file cần import
      </label>
      <input
        id="file-upload"
        type="file"
        name="file-upload"
        style={{
          display: "none",
        }}
        accept=".xlsx, .xls"
        onChange={(e: any) => handleFileUpload(e.target.files[0])}
      />
    </div>
  );
};

export default UploadFile;
