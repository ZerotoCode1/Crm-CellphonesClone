import LoadingPageService from "@/services/loadingPage";

const DemoComponents = () => {
  return (
    <div>
      <div
        className=""
        onClick={() => LoadingPageService.instance.current.open()}
      >
        loading
      </div>
    </div>
  );
};

export default DemoComponents;
