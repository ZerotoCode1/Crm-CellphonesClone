import { Tabs } from "antd";

interface props {
  items: any;
  onChangeTab: (value: string) => void;
}
const TabsCustom = (props: props) => {
  const { items, onChangeTab } = props;
  return <Tabs items={items} onChange={onChangeTab}></Tabs>;
};
export default TabsCustom;
