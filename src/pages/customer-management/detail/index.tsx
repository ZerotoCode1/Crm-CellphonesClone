import { CommonComponent } from "@/components/common-component";
import { fieldsTable } from "@/constants/fieldsTable";
import useGetDetailCustomerInfo from "@/hooks/api/customer/useDetailCustomerInfo";

interface Props {
  id: number;
}

const DetailCustomer = (props: Props) => {
  const { id } = props;
  const { dataDetail } = useGetDetailCustomerInfo(id);
  return (
    <div className="flex flex-wrap gap-x-2">
      <div className="w-[calc(100%/4-8px)]">
        <CommonComponent.Input title={fieldsTable.customerName.label} value={dataDetail?.customerName} readOnly />
      </div>
      <div className="w-[calc(100%/4-8px)]">
        <CommonComponent.Input title={fieldsTable.customerEmail.label} value={dataDetail?.customerEmail} readOnly />
      </div>
      <div className="w-[calc(100%/4-8px)]">
        <CommonComponent.Input title={fieldsTable.customerPhone.label} value={dataDetail?.customerPhone} readOnly />
      </div>
      <div className="w-[calc(100%/4-8px)]">
        <CommonComponent.Input title={fieldsTable.skyjoyMember.label} value={dataDetail?.skyjoyMember} readOnly />
      </div>
    </div>
  );
};

export default DetailCustomer;
