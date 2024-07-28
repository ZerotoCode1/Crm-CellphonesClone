import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  AccessibilityHelp,
  Alignment,
  AutoImage,
  Autosave,
  Base64UploadAdapter,
  Bold,
  CKBox,
  CKBoxImageEdit,
  ClassicEditor,
  CloudServices,
  Essentials,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  Paragraph,
  PictureEditing,
  SelectAll,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TodoList,
  Undo,
} from "ckeditor5";
import { MultiLevelList } from "ckeditor5-premium-features";
import { useEffect, useRef, useState } from "react";

import "ckeditor5-premium-features/ckeditor5-premium-features.css";
import "ckeditor5/ckeditor5.css";

import "./index.css";

const LICENSE_KEY = "T1dZQW5YbmFjSUlFVlBrSWJva0k5SVBqWVdUbVh3Qk1vbjVlMVROUjIwY1ZKcHVUb2Nsdm01cmx0cEdxUnc9PS1NakF5TkRBNE1UVT0=";
const CKBOX_TOKEN_URL = "https://113743.cke-cs.com/token/dev/1780dab19cbd79f9de6c15a4b9f1077d7af840023a22b6460a85e075bd9e?limit=10";

interface CKEditorCustomProps {
  content?: string;
  setContent: Function;
}
const CkEditorCustom = (prop: CKEditorCustomProps) => {
  const { content, setContent } = prop;
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);

    return () => setIsLayoutReady(false);
  }, []);

  const editorConfig = {
    toolbar: {
      items: [
        "undo",
        "redo",
        "|",
        "selectAll",
        "|",
        "fontSize",
        "fontFamily",
        "fontColor",
        "fontBackgroundColor",
        "|",
        "bold",
        "italic",
        "|",
        "link",
        "insertImage",
        "ckbox",
        "|",
        "alignment",
        "|",
        "bulletedList",
        "numberedList",
        "multiLevelList",
        "todoList",
        "|",
        "insertTable",
      ],
      shouldNotGroupWhenFull: false,
    },
    plugins: [
      AccessibilityHelp,
      Alignment,
      AutoImage,
      Autosave,
      Bold,
      CKBox,
      CKBoxImageEdit,
      CloudServices,
      Essentials,
      FontBackgroundColor,
      FontColor,
      FontFamily,
      FontSize,
      ImageBlock,
      ImageCaption,
      ImageInline,
      ImageInsert,
      ImageInsertViaUrl,
      ImageResize,
      ImageStyle,
      ImageTextAlternative,
      ImageToolbar,
      ImageUpload,
      Italic,
      Link,
      LinkImage,
      List,
      ListProperties,
      MultiLevelList,
      Paragraph,
      PictureEditing,
      SelectAll,
      TodoList,
      Undo,
      Base64UploadAdapter,
      Table,
      TableCaption,
      TableCellProperties,
      TableColumnResize,
      TableProperties,
      TableToolbar,
    ],
    ckbox: {
      tokenUrl: CKBOX_TOKEN_URL,
    },
    fontFamily: {
      supportAllValues: true,
    },
    fontSize: {
      options: [10, 12, 14, "default", 18, 20, 22],
      supportAllValues: true,
    },
    image: {
      toolbar: [
        "toggleImageCaption",
        "imageTextAlternative",
        "|",
        "imageStyle:inline",
        "imageStyle:wrapText",
        "imageStyle:breakText",
        "|",
        "resizeImage",
        "|",
        "ckboxImageEdit",
      ],
    },
    initialData: "",
    licenseKey: LICENSE_KEY,
    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: "https://",
      decorators: {
        toggleDownloadable: {
          mode: "manual",
          label: "Downloadable",
          attributes: {
            download: "file",
          },
        },
      },
    },
    list: {
      properties: {
        styles: true,
        startIndex: true,
        reversed: true,
      },
    },
    placeholder: "Nhập nội dung tại đây...",
    table: {
      contentToolbar: ["tableColumn", "tableRow", "mergeTableCells", "tableProperties", "tableCellProperties"],
    },
  };
  const handleChange = (event: any, editor: any) => {
    const data = editor.getData();
    setContent(data);
  };

  return (
    <div>
      <div className="main-container">
        <div className="editor-container editor-container_classic-editor" ref={editorContainerRef}>
          <div className="editor-container__editor">
            <div ref={editorRef}>{isLayoutReady && <CKEditor editor={ClassicEditor} config={editorConfig} onChange={handleChange} />}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CkEditorCustom;
