// import { sourceIcons } from "@/components/CommonIcons";

interface Props {
  img: string;
  name: string;
}
const PinCustom = (props: Props) => {
  const { img, name } = props;
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          width: "150px",
          minHeight: "150px",
          padding: "10px",
          borderRadius: "10px",
          backgroundColor: "#FFF",
        }}
      >
        <img src={img} alt="" style={{ width: "100%", height: "70%" }} />
        <p style={{ marginTop: "5px", fontWeight: "600" }}>{name}</p>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {/* <sourceIcons.LocationMap /> */}
      </div>
    </div>
  );
};

export default PinCustom;
