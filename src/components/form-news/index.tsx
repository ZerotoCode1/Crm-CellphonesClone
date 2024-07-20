import { Button, Form } from "antd";
import { useEffect, useState } from "react";

// import StoreUploadImageContext from "stores/StoreUploadImage";
// import { getBase64, getBase64UploadCk } from "common/common";

import { useNavigate } from "react-router-dom";

import { CommonComponent } from "@/components/common-component";
import { BaseRoute } from "@/constants/baseRoute";
import { SUCCESS } from "@/constants/common";
import useGetListAppCode from "@/hooks/api/news/useGetListAppCode";
import newsService from "@/services/news/news.service";
import type { UploadFile } from "antd/es/upload/interface";
import { toast } from "react-toastify";
interface FormValues {
  titleVi: string;
  titleEn: string;
  descVi: string;
  descEn: string;
  imageVi: UploadFile[];
  imageEn: UploadFile[];
  appCode: string[];
}
interface SwitchValues {
  popular: boolean;
  isHidden: boolean;
}
interface props {
  id?: number;
}
const FormNews = (props: props) => {
  const { id = 0 } = props;
  const [form] = Form.useForm<any>();

  const [tabs, setTabs] = useState<any>("vi");
  const [fileList, setFileList] = useState<any>([]);
  const [fileListEn, setFileListEn] = useState<any>([]);
  const [clientReady, setClientReady] = useState(false);
  const [contentVi, setContentVi] = useState("");
  const [contentEn, setContentEn] = useState("");
  //   const [listAppCode, setListAppCode] = useState<
  //     { label: string; value: string }[]
  //   >([]);
  const [ValueAppCode, setValueAppCode] = useState<string[]>([]);
  const navigate = useNavigate();
  const [loadingCallApi, setLoadingCallApi] = useState(false);
  const [valueSw, setValueSw] = useState<SwitchValues>({
    popular: false,
    isHidden: false,
  });
  const { dataAppCode } = useGetListAppCode();

  const onFinish = async (values: FormValues) => {
    setLoadingCallApi(true);
    let body: any = {
      news: [
        {
          title: values.titleVi,
          image: fileList[0].url,
          content: contentVi,
          desc: values.descVi,
          language: "vi",
        },
        {
          title: values.titleEn,
          image: fileListEn[0].url,
          content: contentEn,
          desc: values.descEn,
          language: "en",
        },
      ],
      appCode: values.appCode,
      popular: valueSw.popular ? 1 : 0,
      isHidden: !valueSw.isHidden,
    };
    if (id) body = { ...body, newsId: Number(id) };
    try {
      if (id) {
        const res = await newsService.UpdateNews(body);
        if (res?.data.result.errorCode === SUCCESS) {
          navigate(BaseRoute.News);
          toast.success("Cập nhật tin tức thành công");
        }
      } else {
        const res = await newsService.createNews(body);
        if (res?.data.result.errorCode === SUCCESS) {
          navigate(BaseRoute.News);
          toast.success("Tạo mới tin tức thành công");
        }
      }

      // const res = await StoreNews.update_News(body);
      // if (res?.code === "S200") {

      //   toast.success("Cập nhật tin tức thành công");
      // }
    } catch (e) {
    } finally {
      setLoadingCallApi(false);
    }
    setLoadingCallApi(false);
  };
  const getDetailNews = async () => {
    try {
      const res = await newsService.getDetailNews(id);

      const data = res.data.result.wsResponse.result;
      data.forEach((item: any) => {
        if (item.language === "vi") {
          form.setFieldsValue({
            titleVi: item?.title,
            descVi: item?.desc,
            imageVi: [
              {
                url: item?.image,
              },
            ],
            appCode: data[0]?.appCodes,
          });
          setContentVi(item?.content);
          setFileList([
            {
              url: item?.image,
            },
          ]);
        }
        if (item.language === "en") {
          form.setFieldsValue({
            titleEn: item?.title,
            descEn: item?.desc,
            imageEn: [
              {
                url: item?.image,
              },
            ],
          });
          setContentEn(item?.content);
          setFileListEn([
            {
              url: item?.image,
            },
          ]);
        }
      });

      setValueSw({
        popular: data[0]?.popular === 1 ? true : false,
        isHidden: data[0]?.isHidden ? false : true,
      });
    } catch (e) {}
  };
  useEffect(() => {
    if (id) {
      getDetailNews();
    }
  }, [id]);

  useEffect(() => {
    setClientReady(true);
  }, []);

  const items: any = [
    {
      key: "vi",
      label: "Tiếng việt",
    },
    {
      key: "en",
      label: "Tiếng anh ",
    },
  ];

  const onChangeTab = (key: string | number) => {
    setTabs(key);
  };

  const hasOtherFieldsErrors = () => {
    const fieldsError = form.getFieldsError();
    //@ts-ignore
    return fieldsError.filter(({ name, errors }) => errors.length).length > 0;
  };

  return (
    <div className="box-radius box-radius-custom custom-form form-news">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2 style={{ fontWeight: "bold" }}>Nội dung bài viết</h2>
        <Button onClick={() => navigate(BaseRoute.News)} className="btn-rdu" size="large">
          Quay lại
        </Button>
      </div>
      <div>
        <CommonComponent.TabsCustom items={items} onChangeTab={onChangeTab} />
      </div>
      <Form name="new_update" autoComplete="off" layout="vertical" form={form} onFinish={onFinish}>
        <div
          style={{
            width: "100%",
            maxWidth: "1000px",
            display: "flex",
            gap: "30px",
          }}
        >
          <div style={{ width: "50%" }}>
            <Form.Item
              label="Tiêu đề  "
              name={"titleVi"}
              style={{ margin: 0, display: tabs === "vi" ? "block" : "none" }}
              rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
            >
              <CommonComponent.Input maxLength={200} allowClear placeholder="Nhập tiêu đề" />
            </Form.Item>

            <Form.Item
              label="Tiêu đề "
              name={"titleEn"}
              style={{ margin: 0, display: tabs === "en" ? "block" : "none" }}
              rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
            >
              <CommonComponent.Input maxLength={200} allowClear placeholder="Nhập tiêu đề" />
            </Form.Item>

            <Form.Item
              label="Mô tả ngắn  "
              name={"descVi"}
              className="resize_none"
              style={{
                marginTop: "20px",
                display: tabs === "vi" ? "block" : "none",
              }}
              rules={[{ required: true, message: "Vui lòng nhập mô tả ngắn" }]}
            >
              <CommonComponent.InputTextArea style={{ height: 130, resize: "none" }} placeholder="Nhập mô tả ngắn " />
            </Form.Item>

            <Form.Item
              label="Mô tả ngắn  "
              name={"descEn"}
              style={{
                marginTop: "20px",
                display: tabs === "en" ? "block" : "none",
              }}
              rules={[{ required: true, message: "Vui lòng nhập mô tả ngắn" }]}
              className="resize_none"
            >
              <CommonComponent.InputTextArea style={{ height: 130, resize: "none" }} placeholder="Nhập mô tả ngắn " />
            </Form.Item>
          </div>
          <div style={{ width: "50%", height: "220px" }}>
            <Form.Item
              label="Ảnh  "
              name={"imageVi"}
              style={{ display: tabs === "vi" ? "block" : "none" }}
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn ảnh bìa",
                },
              ]}
            >
              <CommonComponent.UploadImage setFileList={setFileList} fileList={fileList} name="imageVi" />
            </Form.Item>

            <Form.Item
              style={{ display: tabs === "en" ? "block" : "none" }}
              label="Ảnh "
              name={"imageEn"}
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn ảnh bìa",
                },
              ]}
            >
              <CommonComponent.UploadImage setFileList={setFileListEn} fileList={fileListEn} name="imageEn" />
            </Form.Item>
          </div>
        </div>
        <Form.Item
          style={{ display: tabs === "vi" ? "block" : "none" }}
          label="Nội dung "
          name={"contentVi"}
          rules={[{ required: true, message: "Vui lòng nhập nội dung bài viết" }]}
        >
          <CommonComponent.CKEditor5 content={contentVi} setContent={setContentVi} name={"contentVi"} form={form} />
        </Form.Item>
        <Form.Item
          style={{ display: tabs === "en" ? "block" : "none" }}
          label="Nội dung "
          name={"contentEn"}
          rules={[{ required: true, message: "Vui lòng nhập nội dung bài viết" }]}
        >
          <CommonComponent.CKEditor5 content={contentEn} setContent={setContentEn} name={"contentEn"} form={form} />
        </Form.Item>
        <h2 style={{ fontWeight: "bold" }}>Cấu hình bài viết </h2>
        <div style={{ display: "flex", gap: "30px", marginBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div>Phổ biến:</div>
            <div>
              <CommonComponent.Switch
                checked={valueSw.popular}
                onChange={(value) => {
                  setValueSw({
                    ...valueSw,
                    popular: value,
                  });
                }}
                style={{ width: "80px" }}
                checkedChildren="Bật"
                unCheckedChildren="Tắt"
              />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div>Trạng thái hiển thị:</div>
            <div>
              <CommonComponent.Switch
                checked={valueSw.isHidden}
                onChange={(value: any) => {
                  setValueSw({
                    ...valueSw,
                    isHidden: value,
                  });
                }}
                style={{ width: "90px" }}
                checkedChildren="Hiển thị"
                unCheckedChildren="Ẩn"
              />
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ display: "flex", gap: "4px", marginTop: "8px" }}>
              Web hiển thị: <span style={{ color: "red" }}>*</span>
            </div>
            <Form.Item rules={[{ required: true, message: "Vui lòng chọn web hiển thị" }]} style={{ margin: "0" }} name={"appCode"}>
              <CommonComponent.Select
                mode="multiple"
                // size={size}
                value={ValueAppCode}
                placeholder="chọn web hiển thị"
                style={{ minWidth: "200px" }}
                options={dataAppCode}
                onChange={(values: any) => setValueAppCode(values)}
              />
            </Form.Item>
          </div>
        </div>

        <Form.Item shouldUpdate>
          {() => (
            <Button
              loading={loadingCallApi}
              disabled={!clientReady || !!form.isFieldsTouched(true) || hasOtherFieldsErrors() || !contentVi || !contentEn}
              className="btn-rdu"
              size="large"
              type="primary"
              htmlType="submit"
            >
              {id ? "Cập nhật" : " Tạo mới"}
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};
export default FormNews;
