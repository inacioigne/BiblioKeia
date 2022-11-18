import BaseField from "src/admin/components/bibframe/baseField"
import Field from "./field"

export default function Extent() {
  return (
    <BaseField name={'Extensão'} field={<Field />} />
  );
}
